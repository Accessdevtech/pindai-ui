"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { EachUtil } from "@/utils/each-utils"
import { Loader2Icon, RefreshCcwIcon } from "lucide-react"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { useGetAktifitasPengabdian } from "../hooks/use-aktifitas-pengabdian"
import ActivityCard from "./activity-card"

export default function PengabdianList() {
  const [value, setValue] = useState("")
  const [search] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const {
    data: Aktifitas,
    refetch,
    isFetching,
  } = useGetAktifitasPengabdian(currentPage, search)
  return (
    <div className='flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md'>
      <div className='flex justify-between'>
        <Input
          value={value}
          placeholder='Cari judul...'
          onChange={e => setValue(e.target.value)}
          className='w-fit bg-white'
        />
        <Button size='icon' onClick={() => refetch()}>
          <RefreshCcwIcon />
        </Button>
      </div>
      {isFetching ? (
        <div className='flex items-center justify-center'>
          <Loader2Icon className='animate-spin' />
        </div>
      ) : (
        <EachUtil
          of={Aktifitas?.track || []}
          render={(item, index) => <ActivityCard key={index} data={item} />}
        />
      )}
      <Pagination>
        <PaginationContent>
          {Aktifitas?.meta?.current_page === 1 ? null : (
            <PaginationItem className='cursor-pointer'>
              <PaginationPrevious
                onClick={e => {
                  e.preventDefault()
                  if (Aktifitas && Aktifitas?.meta?.current_page > 1)
                    setCurrentPage(currentPage - 1)
                }}
              />
            </PaginationItem>
          )}
          <PaginationItem className='cursor-pointer'>
            <EachUtil
              of={[...Array(Aktifitas?.meta.last_page)]}
              render={(_, i) => (
                <PaginationLink
                  key={i}
                  isActive={i + 1 === currentPage}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentPage(i + 1)
                  }}
                >
                  {i + 1}
                </PaginationLink>
              )}
            />
          </PaginationItem>
          {Aktifitas?.meta?.current_page ===
          Aktifitas?.meta.last_page ? null : (
            <PaginationItem className='cursor-pointer'>
              <PaginationNext
                onClick={e => {
                  e.preventDefault()

                  if (
                    Aktifitas &&
                    Aktifitas?.meta?.current_page < Aktifitas?.meta.total
                  )
                    setCurrentPage(currentPage + 1)
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
