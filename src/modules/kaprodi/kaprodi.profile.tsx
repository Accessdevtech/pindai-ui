"use client"
import InputField from "@/components/atom/input-field"
import SelectField from "@/components/atom/select-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { setCookie } from "@/services/storage/cookie-storage-service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { IFakultas } from "../listdata/fakultas.interface"
import { useGetFakultasList } from "../listdata/hooks/use-fakultas/get-fakultas-list"
import { useUpdateProfile } from "./hooks/use-profile/update-profile"
import { IKaprodiProfile } from "./kaprodi.interface"
import { profileSchema, ProfileType } from "./kaprodi.profile.schema"

export default function ProfileKaprodi({ user }: { user: IKaprodiProfile }) {
  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nidn: user.nidn === null ? "" : user.nidn,
      name: user.name,
      email: user.email,
      address: user.address,
      fakultas_id: user.fakultas_id === null ? "" : user.fakultas_id,
    },
  })

  const { data: fakultas } = useGetFakultasList()

  const { mutate, isError } = useUpdateProfile({
    onSuccess: res => {
      if (!res.status) {
        return toast.error(res.message)
      }

      setCookie("user", res.data.user)
      toast.success(res.message)
    },
    onError: err => {
      if (err.response?.data.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          form.setError(key as keyof ProfileType, {
            message: value as string,
            type: "manual",
          })
        }
      }
    },
  })

  if (isError) {
    toast.error("Terjadi kesalahan")
  }

  const onSubmit = (data: ProfileType) => {
    mutate(data)
  }

  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <CardHeader>
          <h1 className='text-lg font-semibold uppercase'>Ubah Profile</h1>
          <CardDescription>
            Semua field bersifat wajib di isi(*)
          </CardDescription>
        </CardHeader>
        <CardContent className='p-6'>
          <Form form={form} onSubmit={onSubmit}>
            <InputField label='NIDN' name='nidn' control={form.control} />
            <InputField label='nama' name='name' control={form.control} />
            <InputField
              label='email'
              type='email'
              name='email'
              control={form.control}
            />
            <InputField label='alamat' name='address' control={form.control} />
            <SelectField
              label='fakultas'
              name='fakultas_id'
              options={(fakultas?.data as IFakultas[]) || []}
              control={form.control}
            />

            <div className='flex justify-end'>
              <Button
                type='submit'
                disabled={!form.formState.isDirty}
                className='px-8'
              >
                Simpan
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
