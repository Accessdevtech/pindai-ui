"use client"
import Alert from "@/components/atom/alert"
import Breadcrumb from "@/components/atom/bradcrumb"
import Modal from "@/components/atom/modal"
import DataTable from "@/components/molecules/data-table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAuthContext } from "@/contexts/auth-context"
import { formatRupiah } from "@/utils/format-rupiah"
import { ColumnDef } from "@tanstack/react-table"
import { useAtom } from "jotai"
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import FormMasterLuaran from "./components/form-master-luaran"
import { useGetLuaran } from "./hooks/use-master-luaran/get-luaran"
import { Luaran } from "./luaran.interface"
import { luaranSearchAtom } from "./state/store"

export default function MasterLuaranPage() {
  const [open, setOpen] = useState<boolean>(false)
  const { user } = useAuthContext()
  const [value, setValue] = useAtom(luaranSearchAtom)
  const [currentPage, setCurrentPage] = useState(1)
  const [search] = useDebounce(value, 500)
  const { data, refetch, isFetching } = useGetLuaran(currentPage, search)

  const columns: ColumnDef<Luaran>[] = [
    {
      accessorKey: "name",
      header: "Nama Luaran",
    },
    {
      accessorKey: "nominal",
      header: "Nominal",
      cell: ({ row }) => {
        return (
          <div className='flex justify-end'>
            <span className='text-right'>
              {formatRupiah(row.original.nominal)}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "terbilang",
      header: "Terbilang",
    },
    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const [open, setOpen] = useState<boolean>(false)
        return (
          <div className='flex justify-center gap-2'>
            <Modal
              open={open}
              setOpen={setOpen}
              Icon={EditIcon}
              title='Ubah Master Luaran'
              size='icon'
              description='Ubah Master Luaran dan Nominal'
            >
              <FormMasterLuaran
                refetch={refetch}
                onClose={() => setOpen(!open)}
                luaran={row.original}
              />
            </Modal>
            <Alert
              Icon={TrashIcon}
              title='Hapus Master Luaran'
              description='Apakah anda yakin ingin menghapus master luaran ini ?'
              size='icon'
              variant='destructive'
              open={false}
              setOpen={function (open: boolean): void {
                open ? open : !open
              }}
            />
          </div>
        )
      },
    },
  ]

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
          >
            <FormMasterLuaran
              refetch={refetch}
              onClose={() => setOpen(!open)}
            />
          </Modal>
        </CardHeader>
        <CardContent className='py-6'>
          <DataTable
            search
            role={user?.role}
            columns={columns}
            data={data?.luaran || []}
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
