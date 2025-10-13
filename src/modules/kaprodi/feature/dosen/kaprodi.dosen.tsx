"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import DataTable from "@/components/molecules/data-table"
import { Card } from "@/components/ui/card"
import { Meta, Role } from "@/interface/type"
import { ROUTE } from "@/services/route"
import { dosenSearch } from "@/state/store"
import { useAtom } from "jotai"
import { useState } from "react"
import { toast } from "sonner"
import { useDebounce } from "use-debounce"
import { columnDosen } from "./components/column-dosen"
import { useActiveDosen } from "./hooks/use-dosen/active-dosen"
import { useApprovedDosen } from "./hooks/use-dosen/approved-dosen"
import { useGetDosen } from "./hooks/use-dosen/get-dosen"

export default function KaprodiDashboardDosen({
  role
}: {
  role: Role | undefined
}) {
  const [value, setValue] = useAtom(dosenSearch)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [search] = useDebounce(value, 500)

  const { data, refetch, isFetching } = useGetDosen(
    currentPage,
    perPage,
    search
  )
  const { mutate: approved } = useApprovedDosen({
    onSuccess: res => {
      if (!res.status) {
        toast.error(res.message)
      }
      toast.success(res.message)
      refetch()
    },
    onError: err => {
      toast.error(err.response?.data.message)
    }
  })

  const { mutate: active } = useActiveDosen({
    onSuccess: res => {
      if (!res.status) {
        toast.error(res.message)
      }
      toast.success(res.message)
      refetch()
    },
    onError: err => {
      toast.error(err.response?.data.message)
    }
  })

  const column = columnDosen({
    refetch: () => {},
    onApprove: approved,
    onActive: active
  })

  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={`${ROUTE.DASHBOARD}/${role}`}>Dosen</Breadcrumb>
      <Card>
        <div className='p-6'>
          <DataTable
            search
            role={role}
            columns={column}
            data={data?.dosen || []}
            meta={data?.meta || ({} as Meta)}
            currentPage={currentPage}
            isLoading={isFetching}
            refetch={refetch}
            perPage={perPage}
            value={value}
            setValue={setValue}
            setPerPage={setPerPage}
            onPaginationChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </Card>
    </div>
  )
}
