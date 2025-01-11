"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/molecules/form";
import InputField from "@/components/molecules/input-field";
import { useDebounce } from "use-debounce";
import Modal from "@/components/molecules/modal";
import { useAtom } from "jotai";
import { fakultasSearch } from "@/state/store";
import { Button } from "@/components/ui/button";
import { Meta, Role } from "@/interface/type";
import { useDialog } from "@/hooks/use-dialog";
import { fakultasSchema, FakultasType } from "./fakultas.schema";
import DataTable from "@/components/molecules/data-table";
import { columnFakultas } from "./components/column-fakultas";
import { useGetFakultas } from "./hooks/use-fakultas/get-fakultas";
import { useAddFakultas } from "./hooks/use-fakultas/add-fakutlas";

export default function FakultasPage({ role }: { role: Role | undefined }) {
  const [value, setValue] = useAtom(fakultasSearch);
  const [search] = useDebounce(value, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isFetching } = useGetFakultas(currentPage, search);

  const { isOpen, closeDialog, toggleDialog } = useDialog(data?.fakultas || []);
  const { mutate, isError, error } = useAddFakultas({
    onSuccess: (res) => {
      if (!res.status) {
        return toast.error(res.message);
      }
      if (res.data) {
        toast.success(res.message);
      }
      form.reset();
      closeDialog.add();
      refetch();
    },
    onError: (err) => {
      if (err.response?.data.error) {
        for (const [key, value] of Object.entries(err.response.data.error)) {
          form.setError(key as keyof FakultasType, {
            message: value as string,
            type: "manual",
          });
        }
      }
      toast.error(err.response?.data.error);
    },
  });

  const form = useForm<FakultasType>({
    resolver: zodResolver(fakultasSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FakultasType) => {
    mutate(data);
  };

  if (isError) toast.error(error?.message);

  const columns = columnFakultas({
    refetch,
  });

  return (
    <Card>
      <CardHeader className="text-center font-bold text-lg md:text-xl xl:text-2xl py-8 px-6">
        <Modal
          name="tambah fakultas"
          open={isOpen.add}
          setOpen={toggleDialog.add}
          title="tambah fakultas"
          description="tambah fakultas baru"
          btnStyle="capitalize w-fit"
        >
          <Form form={form} onSubmit={onSubmit}>
            <InputField
              label="nama fakultas"
              name="name"
              control={form.control}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              simpan
            </Button>
          </Form>
        </Modal>
      </CardHeader>
      <CardContent>
        <DataTable
          role={role}
          columns={columns}
          data={data?.fakultas || []}
          meta={data?.meta || ({} as Meta)}
          currentPage={currentPage}
          value={value}
          isLoading={isFetching}
          refetch={refetch}
          setValue={setValue}
          onPaginationChange={(page: number) => setCurrentPage(page)}
        />
      </CardContent>
    </Card>
  );
}
