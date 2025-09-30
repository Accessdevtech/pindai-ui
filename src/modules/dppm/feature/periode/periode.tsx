import DataTable from "@/components/molecules/data-table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Meta, Role } from "@/interface/type"
import { prodiSearch } from "@/state/store"
import { useAtom } from "jotai"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { columnPeriode } from "./components/column-periode"
import PeriodeFormModal from "./components/periode-form-modal"
import { useGetPeriodes } from "./hooks/get-periode"

interface PeriodeProps {
  role: Role
}

export default function Periode({ role }: PeriodeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useAtom(prodiSearch)
  const [search] = useDebounce(value, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const {
    data: periodeList,
    isFetching,
    refetch
  } = useGetPeriodes({
    page: currentPage,
    perPage,
    search
  })

  const column = columnPeriode({
    refetch
  })

  return (
    <Card className='h-full w-full'>
      <CardHeader className='px-6 py-8 text-center text-lg font-bold md:text-xl xl:text-2xl'>
        <PeriodeFormModal
          mode='create'
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          refetch={refetch}
        />
      </CardHeader>
      <CardContent>
        <DataTable
          columns={column}
          data={periodeList?.periode || []}
          search
          role={role}
          meta={periodeList?.meta || ({} as Meta)}
          currentPage={currentPage}
          perPage={perPage}
          value={value}
          isLoading={isFetching}
          refetch={refetch}
          setPerPage={setPerPage}
          setValue={setValue}
          onPaginationChange={(page: number) => setCurrentPage(page)}
        />
      </CardContent>
    </Card>
  )
}
