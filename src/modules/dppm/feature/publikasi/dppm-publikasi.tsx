"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import DataTable from "@/components/molecules/data-table"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthContext } from "@/contexts/auth-context"
import {
  columnVisibilityAtom,
  publikasiSearch,
  statusDppmAtom,
  statusKaprodiAtom,
  statusKeuanganAtom
} from "@/state/store"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { columnPublikasi } from "./components/column-publikasi"
import { useGetPublikasi } from "./hooks/use-publikasi/get-publikasi"

export default function DppmPublikasi() {
  const statusKaprodi = useAtomValue(statusKaprodiAtom)
  const statusDppm = useAtomValue(statusDppmAtom)
  const statusKeuangan = useAtomValue(statusKeuanganAtom)
  const [value, setValue] = useAtom(publikasiSearch)
  const [search] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { user } = useAuthContext()
  const setColumnVisibility = useSetAtom(columnVisibilityAtom)
  const { data, refetch, isFetching } = useGetPublikasi(
    currentPage,
    perPage,
    search,
    statusKaprodi,
    statusDppm,
    statusKeuangan
  )

  const columns = columnPublikasi({
    pubilkasi: data?.publikasi || [],
    refetch
  })

  useEffect(() => {
    setColumnVisibility({
      status_kaprodi: true,
      status_dppm: true,
      status_keuangan: true
    })
  }, [])
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
            perPage={perPage}
            setPerPage={setPerPage}
            setValue={setValue}
            currentPage={currentPage}
            onPaginationChange={(page: number) => setCurrentPage(page)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
