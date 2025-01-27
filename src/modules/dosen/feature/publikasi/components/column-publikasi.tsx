import Alert from "@/components/atom/alert"
import Modal from "@/components/atom/modal"
import StatusBadge from "@/components/atom/status-badge"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { EditIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useDeletePublikasi } from "../hooks/use-publikasi/delete-publikasi"
import { Publikasi, PublikasiDosen } from "../publikasi-interface"
import FormPublikasi from "./form-publikasi"

interface columnPublikasiProps {
  pubilkasi: Publikasi[]
  refetch: () => void
}

export const columnPublikasi = ({
  pubilkasi,
  refetch,
}: columnPublikasiProps): ColumnDef<PublikasiDosen>[] => {
  return [
    {
      accessorKey: "judul",
      header: "Judul Pengabdian",
    },
    {
      accessorKey: "author",
      header: "Penulis",
    },
    {
      accessorKey: "tanggal_publikasi",
      header: "Tanggal Publikasi",
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_publikasi)
        return <span>{format(date, "PPP", { locale: id })}</span>
      },
    },
    {
      accessorKey: "tahun",
      header: "Tahun",
    },
    {
      accessorKey: "jurnal",
      header: "Jurnal",
    },
    {
      accessorKey: "status",
      header: "status",
      columns: [
        {
          id: "status.kaprodi",
          accessorKey: "status.kaprodi",
          header: "Kaprodi",
          cell: ({ row }) => (
            <StatusBadge status={row.original.status.kaprodi} />
          ),
        },
        {
          id: "status.dppm",
          accessorKey: "status.dppm",
          header: "Dppm",
          cell: ({ row }) => <StatusBadge status={row.original.status.dppm} />,
        },
        {
          id: "status.keuangan",
          accessorKey: "status.keuangan",
          header: "Keuangan",
          cell: ({ row }) => (
            <StatusBadge status={row.original.status.keuangan} />
          ),
        },
      ],
    },
    {
      id: "action",
      accessorKey: "action",
      header: "aksi",
      cell: ({ row }) => {
        const [open, setOpen] = useState(false)
        const [alert, setAlert] = useState(false)

        const data = pubilkasi.find(
          publikasi => publikasi.id === row.original.id,
        )
        const { mutate } = useDeletePublikasi({
          onSuccess: res => {
            toast.success(res.message)
            refetch()
          },
          onError: err => {
            toast.error(err.response?.data.message)
          },
        })

        return (
          row.original.status.kaprodi !== "accepted" &&
          row.original.status.dppm !== "accepted" && (
            <span className='flex items-center justify-center gap-2'>
              <Modal
                open={open}
                setOpen={setOpen}
                Icon={EditIcon}
                title='Edit Publikasi'
                size='icon'
                description='Edit Publikasi'
                tooltipContent='Edit Publikasi'
                className='max-w-2xl'
              >
                <div className='flex flex-col gap-4 overflow-hidden px-1'>
                  <FormPublikasi
                    refetch={refetch}
                    publikasi={data}
                    onClose={() => setOpen(false)}
                  />
                </div>
              </Modal>
              <Alert
                Icon={TrashIcon}
                open={alert}
                setOpen={setAlert}
                title='Hapus Publikasi'
                size='icon'
                variant='destructive'
                description='Apakah anda yakin ingin menghapus publikasi ini?'
                onClick={() => {
                  mutate({ id: row.original.id })
                }}
              />
            </span>
          )
        )
      },
    },
  ]
}
