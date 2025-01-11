"use client";
import Breadcrumb from "@/components/molecules/bradcrumb";
import DataTable from "@/components/molecules/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetPenelitian } from "./hook/use-penelitian/get-penelitian";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { columnPenelitian } from "./components/column-penelitian";

export default function PenelitianDosenPage() {
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search] = useDebounce(value, 1000);
  const { data, refetch } = useGetPenelitian(currentPage, search);

  const columns = columnPenelitian();

  console.log(data?.penelitian);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb href={"/dashboard/dosen"}>Penelitian</Breadcrumb>
      <Card className="">
        <CardContent className="py-6">
          <DataTable
            columns={columns}
            data={data?.penelitian || []}
            meta={data?.meta}
            value={value}
            refetch={refetch}
            setValue={setValue}
            currentPage={currentPage}
            onPaginationChange={(page: number) => setCurrentPage(page)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
