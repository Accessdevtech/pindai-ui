"use client"
import DataTable from "@/components/molecules/data-table"
import { Card } from "@/components/ui/card"
import { Meta } from "@/interface/type"
import { dosenSearch } from "@/state/store"
import { useAtom } from "jotai"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { columnDosen } from "./components/column-dosen"
import { useGetDosen } from "./hooks/use-dosen/get-dosen"

export default function DosenPageDppm() {
  const [value, setValue] = useAtom(dosenSearch)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search] = useDebounce(value, 500)

  const { data, refetch, isFetching } = useGetDosen(
    currentPage,
    perPage,
    search,
  )

  console.log(data?.dosen)

  const column = columnDosen({
    refetch,
  })

  return (
    <Card>
      <div className='p-6'>
        <DataTable
          search
          columns={column}
          data={data?.dosen || []}
          meta={data?.meta || ({} as Meta)}
          currentPage={currentPage}
          isLoading={isFetching}
          refetch={refetch}
          perPage={perPage}
          setPerPage={setPerPage}
          value={value}
          setValue={setValue}
          onPaginationChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </Card>
  )
}
