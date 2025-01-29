"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import DataTable from "@/components/molecules/data-table"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthContext } from "@/contexts/auth-context"
import { publikasiSearch } from "@/state/store"
import { useAtom } from "jotai"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { columnPublikasi } from "./components/column-publikasi"
import { useGetPublikasi } from "./hooks/use-publikasi/get-publikasi"

export default function KaprodiPublikasi() {
  const [value, setValue] = useAtom(publikasiSearch)
  const [search] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const { user } = useAuthContext()
  const { data, refetch, isFetching } = useGetPublikasi(currentPage, search)

  const columns = columnPublikasi({
    pubilkasi: data?.publikasi || [],
    refetch,
  })
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={`/dashboard/${user?.role}`}>Publikasi</Breadcrumb>
      <Card>
        <CardContent className='py-6'>
          <DataTable
            search
            role={user?.role}
            columns={columns}
            data={data?.publikasi || []}
            meta={data?.meta}
            value={value}
            refetch={refetch}
            isLoading={isFetching}
            setValue={setValue}
            currentPage={currentPage}
            onPaginationChange={(page: number) => setCurrentPage(page)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
