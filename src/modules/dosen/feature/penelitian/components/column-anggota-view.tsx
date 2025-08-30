import Alert from "@/components/atom/alert"
import { ColumnDef } from "@tanstack/react-table"
import { useAtom } from "jotai"
import { TrashIcon } from "lucide-react"
import { useState } from "react"
import { AnggotaSchemaType } from "../schema/dosen-schema"
import { anggotaAtom } from "../state/store"

export const columnAnggotaView = (): ColumnDef<AnggotaSchemaType>[] => {
  return [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => <span>{row.index + 1}</span>
    },
    {
      accessorKey: "nidn",
      header: "NIDN/NIM"
    },
    {
      accessorKey: "name",
      header: "Nama"
    },
    {
      accessorKey: "name_with_title",
      header: "Nama Dengan Gelar"
    },
    {
      accessorKey: "fakultas",
      header: "Fakultas"
    },
    {
      accessorKey: "prodi",
      header: "Prodi"
    },
    {
      accessorKey: "phone_number",
      header: "Nomor Telepon"
    },
    {
      accessorKey: "email",
      header: "Email"
    },
    {
      accessorKey: "scholar_id",
      header: "Scholar ID"
    },
    {
      accessorKey: "scopus_id",
      header: "Scopus ID"
    },
    {
      accessorKey: "job_functional",
      header: "Jabatan Fungsional"
    },
    {
      accessorKey: "affiliate_campus",
      header: "Kapus afiliasi"
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const [anggotaValue, setAnggotaValue] = useAtom(anggotaAtom)
        const item = row.original
        const [open, setOpen] = useState(false)

        const handleClick = () => {
          const newValue = anggotaValue.filter(
            item => item.nidn !== row.original.nidn
          )
          setAnggotaValue(newValue)
        }

        return (
          <Alert
            Icon={TrashIcon}
            open={open}
            setOpen={setOpen}
            title={`hapus data ${item.name} ini`}
            triggerAction='hapus'
            description={`apakah anda yakin ingin menghapus ${item.name} ini?`}
            className='bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground'
            onClick={handleClick}
            tooltipContentText='hapus anggota'
            size='icon'
            side='right'
          />
        )
      }
    }
  ]
}
