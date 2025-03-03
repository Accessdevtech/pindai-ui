import Modal from "@/components/atom/modal"
import StatusBadge from "@/components/atom/status-badge"
import Tooltip from "@/components/atom/tooltip"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { CheckIcon, InfoIcon } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useApprovePublikasi } from "../hooks/use-publikasi/approve-publikasi"
import { Publikasi, PublikasiKeuangan } from "../publikasi-interface"

interface columnPublikasiProps {
  pubilkasi: Publikasi[]
  refetch: () => void
}

export const columnPublikasi = ({
  pubilkasi,
  refetch,
}: columnPublikasiProps): ColumnDef<PublikasiKeuangan>[] => {
  return [
    {
      id: "action",
      accessorKey: "action",
      header: "aksi",
      cell: ({ row }) => {
        const { mutate: approved } = useApprovePublikasi({
          onSuccess: res => {
            if (!res.status) {
              toast.error(res.message)
            }
            toast.success(res.message)
            refetch()
          },
          onError: err => {
            toast.error(err.response?.data.message)
          },
        })

        const data = pubilkasi.find(
          publikasi => publikasi.id === row.original.id,
        )

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
                {[
                  row.original.status.kaprodi,
                  row.original.status.dppm,
                ].includes("rejected") && (
                  <div className='rounded-lg border border-red-500 px-4 py-2 text-red-500'>
                    <p className='text-sm capitalize'>
                      <span className='font-medium'>Kaprodi Komentar: </span>
                      {data?.keterangan}
                    </p>
                  </div>
                )}
                {row.original.status.kaprodi === "accepted" &&
                  row.original.status.dppm === "rejected" && (
                    <div className='rounded-lg border border-red-500 px-4 py-2 text-red-500'>
                      <p className='text-sm capitalize'>
                        <span className='font-medium'>Dppm Komentar: </span>
                        {data?.keterangan}
                      </p>
                    </div>
                  )}
                <span>
                  <p className='flex justify-between text-sm capitalize'>
                    <span className='font-medium'>Judul:</span>
                    <span className='max-w-sm text-end'>{data?.judul}</span>
                  </p>
                  <Separator />
                </span>
                <span>
                  <p className='flex justify-between text-sm capitalize'>
                    <span className='font-medium'>Jenis Publikasi:</span>
                    <span className='max-w-sm text-end'>
                      {data?.jenis_publikasi_label}
                    </span>
                  </p>
                  <Separator />
                </span>
                <span>
                  <p className='flex justify-between text-sm capitalize'>
                    <span className='font-medium'>Indeksasi:</span>
                    <span className='max-w-sm text-end'>
                      {data?.luaran_kriteria_label}
                    </span>
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
            {row.original.status.kaprodi === "pending" &&
              row.original.status.dppm === "pending" &&
              row.original.status.keuangan === "pending" && (
                <Tooltip contentText='Setuju'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='bg-green-500/30 text-green-500 hover:bg-green-500 hover:text-primary-foreground'
                    onClick={() => approved({ id: row.original.id })}
                  >
                    <CheckIcon />
                  </Button>
                </Tooltip>
              )}
          </span>
        )
      },
    },
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
  ]
}
