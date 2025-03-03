import Alert from "@/components/atom/alert"
import Modal from "@/components/atom/modal"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, InfoIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useDeleteLuaran } from "../hooks/use-master-luaran/delete-luaran"
import { Luaran } from "../luaran.interface"
import { columnsDetailMasterLuaran } from "./column-detail-luaran"
import { DataTableLuaran } from "./data-table-luaran"
import FormMasterLuaran from "./form-master-luaran"

interface Props {
  perPage: number
  refetch: () => void
  setPerPage: (perPage: number) => void
}

export const columnsViewMasterLuaran = ({
  perPage,
  refetch,
  setPerPage,
}: Props): ColumnDef<Luaran>[] => {
  return [
    {
      accessorKey: "category",
      header: "Kategori",
    },
    {
      accessorKey: "name",
      header: "Nama Luaran",
    },
    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const [open, setOpen] = useState<boolean>(false)
        const [openDetail, setOpenDetail] = useState<boolean>(false)
        const [alertOpen, setAlertOpen] = useState<boolean>(false)

        const { mutate } = useDeleteLuaran({
          onSuccess: res => {
            toast.success(res.message)
            refetch()
          },
          onError: err => {
            toast.error(err.response?.data.message)
          },
        })

        return (
          <div className='flex justify-center gap-2'>
            <Modal
              open={openDetail}
              setOpen={setOpenDetail}
              Icon={InfoIcon}
              title='Detail Master Luaran'
              size='icon'
              description='Detail Master Luaran'
              btnStyle='bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground'
            >
              <DataTableLuaran
                search
                perPage={perPage}
                setPerPage={setPerPage}
                columns={columnsDetailMasterLuaran}
                data={row.original.kriteria || []}
                refetch={refetch}
              />
            </Modal>
            <Modal
              open={open}
              setOpen={setOpen}
              Icon={EditIcon}
              title='Ubah Master Luaran'
              size='icon'
              description='Ubah Master Luaran dan Nominal'
              className='max-h-screen overflow-auto'
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
              onClick={() => mutate({ id: row.original.id })}
              open={alertOpen}
              setOpen={setAlertOpen}
            />
          </div>
        )
      },
    },
  ]
}
