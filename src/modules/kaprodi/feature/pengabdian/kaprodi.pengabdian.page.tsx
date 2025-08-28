"use client"

import Breadcrumb from "@/components/atom/bradcrumb"
import DataTable from "@/components/molecules/data-table"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthContext } from "@/contexts/auth-context"
import {
  columnVisibilityAtom,
  statusDppmAtom,
  statusKaprodiAtom,
  statusKeuanganAtom,
  tahunAkademikAtom
} from "@/state/store"
import { useAtomValue, useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { columnPengabdian } from "./components/column-pengabdian"
import { useGetPengabdian } from "./hooks/use-pengabdian/get-pengabdian"

export default function PengabdianKaprodiPage() {
  const tahunAkademik = useAtomValue(tahunAkademikAtom)
  const statusKaprodi = useAtomValue(statusKaprodiAtom)
  const statusDppm = useAtomValue(statusDppmAtom)
  const statusKeuangan = useAtomValue(statusKeuanganAtom)
  const { user } = useAuthContext()
  const [value, setValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search] = useDebounce(value, 1000)
  const setColumnVisibility = useSetAtom(columnVisibilityAtom)
  const { data, refetch, isFetching } = useGetPengabdian(
    currentPage,
    perPage,
    search,
    tahunAkademik,
    statusKaprodi,
    statusDppm,
    statusKeuangan
  )

  const columns = columnPengabdian()

  useEffect(() => {
    setColumnVisibility({
      status_kaprodi: true,
      status_dppm: true,
      status_keuangan: true
    })
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={"/dashboard/kaprodi"}>Pengabdian</Breadcrumb>
      <Card>
        <CardContent className='py-6'>
          <DataTable
            search
            filtering={{
              tahunAkademik: true
            }}
            role={user?.role}
            columns={columns}
            data={data?.pengabdian || []}
            meta={data?.meta}
            value={value}
            perPage={perPage}
            setPerPage={setPerPage}
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
