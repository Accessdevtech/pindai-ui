import { ColumnDef } from "@tanstack/react-table";
import { IndeksasiData } from "@/modules/listdata/indeksasi.list.interface";

export const columnJenisIndeksasi = (): ColumnDef<IndeksasiData>[] => {
  return [
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "kriteria",
      header: "Kriteria",
    },
    {
      accessorKey: "keterangan",
      header: "Keterangan",
    },
  ];
};
