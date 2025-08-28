import DataTable from "@/components/molecules/data-table"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "@/interface/type"
import { columnVisibilityAtom, tahunAkademikAtom } from "@/state/store"
import { useAtomValue, useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { columnPublikasi } from "../../publikasi/components/column-publikasi"
import { useGetPublikasi } from "../../publikasi/hooks/use-publikasi/get-publikasi"

export default function PublikasiList({ user }: { user: User }) {
  const tahunAkademik = useAtomValue(tahunAkademikAtom)
  const [value, setValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search] = useDebounce(value, 1000)
  const setColumnVisibility = useSetAtom(columnVisibilityAtom)
  const { data, refetch, isFetching } = useGetPublikasi(
    currentPage,
    perPage,
    search,
    "",
    "",
    "accepted"
  )

  const columns = columnPublikasi({
    pubilkasi: data?.publikasi || [],
    refetch
  })

  useEffect(() => {
    setColumnVisibility({
      status_kaprodi: false,
      status_dppm: false,
      status_keuangan: false
    })
  }, [])
  return (
    <Card>
      <CardContent className='py-6'>
        <DataTable
          search
          filtering={{
            tahunAkademik: true
          }}
          role={user?.role}
          columns={columns}
          data={data?.publikasi || []}
          meta={data?.meta}
          value={value}
          refetch={refetch}
          isLoading={isFetching}
          setValue={setValue}
          perPage={perPage}
          setPerPage={setPerPage}
          currentPage={currentPage}
          onPaginationChange={(page: number) => setCurrentPage(page)}
        />
      </CardContent>
    </Card>
  )
}
