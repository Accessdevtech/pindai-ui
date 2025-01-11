"use client";
import Form from "@/components/molecules/form";
import InputField from "@/components/molecules/input-field";
import SelectField from "@/components/molecules/select-field";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileType } from "./profile.schema";
import { useForm } from "react-hook-form";
import { useGetFakultasList } from "../listdata/hooks/use-fakultas/get-fakultas-list";
import { useGetProdiList } from "../listdata/hooks/use-prodi/use-prodi-list";
import { Button } from "@/components/ui/button";
import { useUpdateProfile } from "./hooks/use-profile/update-profile";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/auth-context";
import { IProdi, IProfileDosen } from "./dosen.interface";
import { IFakultas } from "../listdata/fakultas.interface";

export default function ProfileDosen() {
  const { user } = useAuthContext();
  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nidn: user?.nidn === null ? "" : user?.nidn,
      name: user?.name,
      name_with_title:
        (user as IProfileDosen)?.name_with_title === null
          ? ""
          : (user as IProfileDosen)?.name_with_title,
      email: user?.email,
      phone_number:
        (user as IProfileDosen)?.phone_number === null
          ? ""
          : (user as IProfileDosen)?.phone_number,
      address: user?.address,
      job_functional:
        (user as IProfileDosen)?.job_functional === null
          ? ""
          : (user as IProfileDosen)?.job_functional,
      affiliate_campus:
        (user as IProfileDosen)?.affiliate_campus === null
          ? ""
          : (user as IProfileDosen)?.affiliate_campus,
      fakultas_id:
        (user as IProfileDosen)?.fakultas_id === null
          ? ""
          : (user as IProfileDosen)?.fakultas_id,
      prodi_id:
        (user as IProfileDosen)?.prodi_id === null
          ? ""
          : (user as IProfileDosen)?.prodi_id,
      scholar_id:
        (user as IProfileDosen)?.scholar_id === null
          ? ""
          : (user as IProfileDosen)?.scholar_id,
      scopus_id:
        (user as IProfileDosen)?.scopus_id === null
          ? ""
          : (user as IProfileDosen)?.scopus_id,
    },
  });

  const { data: fakultas } = useGetFakultasList();
  const watchFakultas = form.watch("fakultas_id");
  const { data: prodi } = useGetProdiList(watchFakultas);

  const { mutate, isError } = useUpdateProfile({
    onSuccess: (res) => {
      if (!res.status) {
        return toast.error(res.message);
      }
      toast.success(res.message);
      form.reset();
    },
    onError: (err) => {
      toast.error(err.response?.data.message);
    },
  });

  if (isError) {
    toast.error("Terjadi kesalahan");
  }

  const onSubmit = (data: ProfileType) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList className="capitalize text-base">
          <BreadcrumbItem>Seting akun</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>akun</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardContent className="p-6">
          <Form form={form} onSubmit={onSubmit}>
            <InputField label="NIDN" name="nidn" control={form.control} />
            <InputField label="nama" name="name" control={form.control} />
            <InputField
              label="nama dengan gelar"
              name="name_with_title"
              control={form.control}
            />
            <InputField
              label="email"
              type="email"
              name="email"
              control={form.control}
            />
            <InputField
              label="No. HP"
              name="phone_number"
              control={form.control}
            />
            <InputField label="alamat" name="address" control={form.control} />
            <InputField
              label="Jabatan fungsional"
              name="job_functional"
              control={form.control}
            />
            <InputField
              label="kampus afiliasi"
              name="affiliate_campus"
              control={form.control}
            />
            <SelectField
              label="fakultas"
              name="fakultas_id"
              options={(fakultas?.data as IFakultas[]) || []}
              control={form.control}
            />
            <SelectField
              label="program studi"
              name="prodi_id"
              options={(prodi?.data as IProdi[]) || []}
              control={form.control}
            />
            <InputField
              label="scholar ID"
              name="scholar_id"
              control={form.control}
            />
            <InputField
              label="scopus ID"
              name="scopus_id"
              control={form.control}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="px-8"
              >
                Simpan
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
