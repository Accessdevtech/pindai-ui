import { ColumnDef } from "@tanstack/react-table";
import { AnggotaType } from "../schema/anggota-schema";
import { Checkbox } from "@/components/ui/checkbox";
import { anggota } from "../state/store";
import { useAtom } from "jotai";
import { Dosen } from "@/modules/dosen/dosen.interface";

export const columnTambahAnggota = (): ColumnDef<Dosen>[] => {
  return [
    {
      id: "select",
      cell: ({ row }) => {
        const [anggotaValue, setAnggotaValue] = useAtom(anggota);
        const isSelected = anggotaValue.some((item) => item.nidn === row.original.nidn);
        return (
          <Checkbox
            checked={isSelected}
            onCheckedChange={(value) => {
              if (value) {
                setAnggotaValue((prev) => [...prev, row.original]);
              } else {
                setAnggotaValue((prev) => prev.filter((item) => item.nidn !== row.original.nidn));
              }
            }}
            disabled={isSelected}
            aria-label="Select row"
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
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
  ];
};
