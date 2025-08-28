"use client"

import Breadcrumb from "@/components/atom/bradcrumb"
import DataTable from "@/components/molecules/data-table"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthContext } from "@/contexts/auth-context"
import {
  statusDppmAtom,
  statusKaprodiAtom,
  statusKeuanganAtom,
  tahunAkademikAtom
} from "@/state/store"
import { useAtomValue } from "jotai"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { columnPenelitian } from "./components/column-penelitian"
import { useGetPenelitian } from "./hooks/use-penelitian/get-penelitian"

export default function PenelitianKeuanganPage() {
  const tahunAkademik = useAtomValue(tahunAkademikAtom)
  const statusKaprodi = useAtomValue(statusKaprodiAtom)
  const statusDppm = useAtomValue(statusDppmAtom)
  const statusKeuangan = useAtomValue(statusKeuanganAtom)
  const { user } = useAuthContext()
  const [value, setValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search] = useDebounce(value, 1000)
  const { data, refetch, isFetching } = useGetPenelitian(
    currentPage,
    perPage,
    search,
    tahunAkademik,
    statusKaprodi,
    statusDppm,
    statusKeuangan
  )

  const columns = columnPenelitian()

  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={"/dashboard/kaprodi"}>Penelitian</Breadcrumb>
      <Card>
        <CardContent className='py-6'>
          <DataTable
            search
            filtering={{
              tahunAkademik: true
            }}
            role={user?.role}
            columns={columns}
            data={data?.penelitian || []}
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
