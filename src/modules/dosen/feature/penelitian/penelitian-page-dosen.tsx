"use client";
import Breadcrumb from "@/components/molecules/bradcrumb";
import DataTable from "@/components/molecules/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetPenelitian } from "./hook/use-penelitian/get-penelitian";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { columnPenelitian } from "./components/column-penelitian";
import Link from "next/link";
import { ROUTE } from "@/services/route";
import { useAuthContext } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function PenelitianDosenPage() {
  const { user } = useAuthContext();
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search] = useDebounce(value, 1000);
  const { data, refetch } = useGetPenelitian(currentPage, search);

  const columns = columnPenelitian();

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb href={"/dashboard/dosen"}>Penelitian</Breadcrumb>
      <Card>
        <CardHeader>
          <Link
            href={`${ROUTE.DASHBOARD}/${user?.role}/penelitian/create`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-fit capitalize",
            )}
          >
            <PlusIcon className="h-4 w-4" />
            <span>tambah penelitian</span>
          </Link>
        </CardHeader>
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
