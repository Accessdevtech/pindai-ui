"use client";
import DataTable from "@/components/molecules/data-table";
import Form from "@/components/molecules/form";
import InputField from "@/components/molecules/input-field";
import Modal from "@/components/molecules/modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDialog } from "@/hooks/use-dialog";
import { kaprodiSearch } from "@/state/store";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { kaprodiSchema, KaprodiType } from "./kaprodi.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { columnKaprodi } from "./components/column-kaprodi";
import { Meta, Role } from "@/interface/type";
import { useGetKaprodi } from "./hooks/use-kaprodi/get-kaprodi";
import { useGetFakultasList } from "@/modules/listdata/hooks/use-fakultas/get-fakultas-list";
import { useAddKaprodi } from "./hooks/use-kaprodi/add-kaprodi";
import SelectField from "@/components/molecules/select-field";
import RadioField from "@/components/molecules/radio-field";

export default function KaprodiPage({ role }: { role: Role | undefined }) {
  const [value, setValue] = useAtom(kaprodiSearch);
  const [search] = useDebounce(value, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isFetching } = useGetKaprodi(currentPage, search);
  const { data: fakultasList } = useGetFakultasList();

  const { isOpen, closeDialog, toggleDialog } = useDialog(data?.kaprodi || []);
  const { mutate, isError, error } = useAddKaprodi({
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
          form.setError(key as keyof KaprodiType, {
            message: value as string,
            type: "manual",
          });
        }
      }
      toast.error(err.response?.data.error);
    },
  });

  const form = useForm<KaprodiType>({
    resolver: zodResolver(kaprodiSchema),
    defaultValues: {
      name: "",
      email: "",
      nidn: "",
      address: "",
      fakultas_id: "",
      status: "true",
    },
  });

  const onSubmit = async (data: KaprodiType) => {
    mutate(data);
  };

  if (isError) toast.error(error?.message);

  const columns = columnKaprodi({
    fakultas: fakultasList?.data || [],
    refetch,
  });

  return (
    <Card>
      <CardHeader className="text-center font-bold text-lg md:text-xl xl:text-2xl py-8 px-6">
        <Modal
          name="tambah kaprodi"
          open={isOpen.add}
          setOpen={toggleDialog.add}
          title="tambah kaprodi"
          description="tambah fakultas baru"
          btnStyle="capitalize w-fit"
        >
          <Form form={form} onSubmit={onSubmit}>
            <InputField
              control={form.control}
              name="name"
              label="nama kaprodi"
            />
            <InputField
              control={form.control}
              name="email"
              label="email"
              type="email"
            />
            <InputField control={form.control} name="nidn" label="nidn" />
            <InputField control={form.control} name="address" label="address" />
            <SelectField
              control={form.control}
              name="fakultas_id"
              label="fakultas"
              options={fakultasList?.data || []}
            />
            <RadioField
              control={form.control}
              name="status"
              label="status"
              options={[
                { label: "aktif", value: "true" },
                { label: "tidak aktif", value: "false" },
              ]}
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
          data={data?.kaprodi || []}
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
