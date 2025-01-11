import { ColumnDef } from "@tanstack/react-table";
import { PenelitianData } from "@/modules/listdata/penelitian.list.interface";
import {
  PenelitianDosen,
  PenelitianDosenData,
} from "../penelitian-dosen.interface";

export const columnPenelitian = (): ColumnDef<PenelitianDosen>[] => {
  return [
    {
      accessorKey: "title",
      header: "Judul",
    },
    {
      accessorKey: "lead",
      header: "Penanggung Jawab",
    },
    {
      accessorKey: "field",
      header: "Bidang",
    },
    {
      accessorKey: "tahun_akademik",
      header: "Tahun Akademik",
    },
    {
      accessorKey: "created_at",
      header: "Dibuat",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];
};
