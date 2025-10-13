"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import Modal from "@/components/atom/modal"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Meta } from "@/interface/type"
import { useAtom } from "jotai"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { columnsViewMasterLuaran } from "./components/column-view-luaran"
import { DataTableLuaran } from "./components/data-table-luaran"
import FormMasterLuaran from "./components/form-master-luaran"
import { useGetLuaran } from "./hooks/use-master-luaran/get-luaran"
import { luaranSearchAtom } from "./state/store"

export default function MasterLuaranPage() {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useAtom(luaranSearchAtom)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [search] = useDebounce(value, 500)
  const { data, refetch, isFetching } = useGetLuaran(
    currentPage,
    search,
    perPage
  )

  // const groupedData = useMemo(() => {
  //   return data?.luaran.reduce(
  //     (acc, item) => {
  //       const category = item.category.toLowerCase()
  //       if (!acc[category]) {
  //         acc[category] = []
  //       }
  //       acc[category].push(item)
  //       return acc
  //     },
  //     {} as { [key: string]: Luaran[] },
  //   )
  // }, [data])

  // const sortedData = useMemo(() => {
  //   return Object.entries(groupedData || ({} as Luaran))
  //     .sort(([a], [b]) => a.localeCompare(b))
  //     .flatMap(([_, items]) => items)
  // }, [groupedData])

  const columnsView = columnsViewMasterLuaran({ perPage, refetch, setPerPage })

  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={"/dashboard/dppm"}>Master Luaran</Breadcrumb>
      <Card>
        <CardHeader>
          <Modal
            open={open}
            setOpen={setOpen}
            Icon={PlusIcon}
            name='Tambah Master Luaran'
            title='Tambah Master Luaran'
            btnStyle='w-fit'
            description='Tambahkan Master Luaran dan Nominal'
            className='max-h-screen overflow-auto'
          >
            <FormMasterLuaran
              refetch={refetch}
              onClose={() => setOpen(!open)}
            />
          </Modal>
        </CardHeader>
        <CardContent className='py-6'>
          <DataTableLuaran
            search
            columns={columnsView}
            data={data?.luaran || []}
            // data={sortedData || []}
            meta={data?.meta || ({} as Meta)}
            value={value}
            refetch={refetch}
            isLoading={isFetching}
            setValue={setValue}
            currentPage={currentPage}
            perPage={perPage}
            setPerPage={setPerPage}
            onPaginationChange={(page: number) => setCurrentPage(page)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
