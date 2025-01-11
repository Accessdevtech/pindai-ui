import { ColumnDef } from "@tanstack/react-table";
import { AnggotaType } from "../schema/anggota-schema";
import { Checkbox } from "@/components/ui/checkbox";
import Alert from "@/components/molecules/alert";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { anggota } from "../state/store";
import { UseFormSetValue } from "react-hook-form";

// interface ColumnAnggotaViewProps {
//   setValue: (value: []) => void;
// }

export const columnAnggotaView = (): ColumnDef<AnggotaType>[] => {
  // export const columnAnggotaView = ({ setValue }: ColumnAnggotaViewProps): ColumnDef<AnggotaType>[] => {
  return [
    {
      id: "select",
      header: "No",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "nidn",
      header: "NIDN",
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "name_with_title",
      header: "Nama Dengan Gelar",
    },
    {
      accessorKey: "prodi",
      header: "Prodi",
    },
    {
      accessorKey: "phone_number",
      header: "Nomor Telepon",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "scholar_id",
      header: "Scholar ID",
    },
    {
      accessorKey: "scopus_id",
      header: "Scopus ID",
    },
    {
      accessorKey: "job_functional",
      header: "Job Functional",
    },
    {
      accessorKey: "affiliate_campus",
      header: "Affiliate Campus",
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const [anggotaValue, setAnggotaValue] = useAtom(anggota);
        const item = row.original;
        const [open, setOpen] = useState(false);

        const handleClick = () => {
          const newValue = anggotaValue.filter(
            (item) => item.nidn !== row.original.nidn,
          );
          setAnggotaValue(newValue);
        };

        return (
          <Alert
            Icon={TrashIcon}
            open={open}
            setOpen={setOpen}
            title={`hapus data ${item.name} ini`}
            description={`apakah anda yakin ingin menghapus ${item.name} ini?`}
            className="bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground"
            onClick={handleClick}
            tooltipContentText="hapus kaprodi"
            size="icon"
            side="right"
          />
        );
      },
    },
  ];
};
