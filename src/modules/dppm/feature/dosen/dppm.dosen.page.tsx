"use client";
import DataTable from "@/components/molecules/data-table";
import { Card } from "@/components/ui/card";
import { columnDosen } from "./components/column-dosen";
import { useGetDosen } from "./hooks/use-dosen/get-dosen";
import { useAtom } from "jotai";
import { dosenSearch } from "@/state/store";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Meta } from "@/interface/type";

export default function DosenPageDppm() {
  const [value, setValue] = useAtom(dosenSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [search] = useDebounce(value, 500);

  const { data, refetch, isFetching } = useGetDosen(currentPage, search);
  const column = columnDosen({
    refetch,
  });

  return (
    <Card>
      <div className="p-6">
        <DataTable
          columns={column}
          data={data?.dosen || []}
          meta={data?.meta || ({} as Meta)}
          currentPage={currentPage}
          isLoading={isFetching}
          refetch={refetch}
          value={value}
          setValue={setValue}
          onPaginationChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </Card>
  );
}
