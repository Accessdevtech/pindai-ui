import Alert from "@/components/atom/alert"
import Modal from "@/components/atom/modal"
import StatusBadge from "@/components/atom/status-badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { EditIcon, InfoIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
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
          id: "status_kaprodi",
          accessorKey: "status_kaprodi",
          header: "Kaprodi",
          cell: ({ row }) => (
            <StatusBadge status={row.original.status.kaprodi} />
          ),
        },
        {
          id: "status_dppm",
          accessorKey: "status_dppm",
          header: "Dppm",
          cell: ({ row }) => <StatusBadge status={row.original.status.dppm} />,
        },
        {
          id: "status_keuangan",
          accessorKey: "status_keuangan",
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
          <span className='flex items-center justify-center gap-2'>
            <Modal
              Icon={InfoIcon}
              title='Detail Publikasi'
              size='icon'
              tooltipContent='Detail Publikasi'
              className='max-w-2xl'
              btnStyle='bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground'
            >
              <div className='flex flex-col gap-4 tracking-wide'>
                <span>
                  <p className='flex justify-between text-sm capitalize'>
                    <span className='font-medium'>Judul:</span> {data?.judul}
                  </p>
                  <Separator />
                </span>
                <span>
                  <p className='flex justify-between text-sm capitalize'>
                    <span className='font-medium'>Jenis Publikasi:</span>
                    {data?.jenis_publikasi_label}
                  </p>
                  <Separator />
                </span>
                <span>
                  <p className='flex justify-between text-sm capitalize'>
                    <span className='font-medium'>Indeksasi:</span>
                    {data?.luaran_kriteria_label}
                  </p>
                  <Separator />
                </span>
                <span>
                  <p className='flex justify-between text-sm capitalize'>
                    <span className='font-medium'>Penulis:</span> {data?.author}
                  </p>
                  <Separator />
                </span>
                <span>
                  <p className='flex justify-between text-sm capitalize'>
                    <span className='font-medium'>Tanggal Publikasi:</span>
                    {data?.tanggal_publikasi
                      ? format(new Date(data?.tanggal_publikasi), "PPP", {
                          locale: id,
                        })
                      : "-"}
                  </p>
                  <Separator />
                </span>
                <span>
                  <p className='flex justify-between text-sm capitalize'>
                    <span className='font-medium'>Tahun:</span>
                    {data?.tahun || "-"}
                  </p>
                  <Separator />
                </span>
                <span>
                  <p className='flex justify-between text-sm capitalize'>
                    <span className='font-medium'>Jurnal:</span>
                    {data?.jurnal || "-"}
                  </p>
                </span>
                <Link
                  href={data?.link_publikasi as string}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "capitalize",
                  )}
                  target='_blank'
                >
                  lihat publikasi
                </Link>
              </div>
            </Modal>
            {row.original.status.kaprodi !== "accepted" &&
              row.original.status.dppm !== "accepted" && (
                <>
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
                </>
              )}
          </span>
        )
      },
    },
  ]
}
