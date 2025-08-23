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
import { jabatanFungsional } from "@/constant/jabatan-fungsional"
import { removeCookie } from "@/services/storage/cookie-storage-service"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useAtomValue } from "jotai"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
// import { useDebounce } from "use-debounce"
import { IFakultas } from "../listdata/fakultas.interface"
import { useGetFakultasList } from "../listdata/hooks/use-fakultas/get-fakultas-list"
import { useGetProdiList } from "../listdata/hooks/use-prodi/use-prodi-list"
import { IProdi, IProfileDosen } from "./dosen.interface"
// import { scholarSearchAtom } from "./feature/scholar/state/store"
import { useUpdateProfile } from "./hooks/use-profile/update-profile"
import { profileSchema, ProfileType } from "./profile.schema"

export default function ProfileDosen({
  user,
  refetch,
}: {
  user: IProfileDosen
  refetch: () => void
}) {
  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nidn: user?.nidn === null ? "" : user?.nidn,
      name: user?.name,
      name_with_title:
        user?.name_with_title === null ? "" : user?.name_with_title,
      email: user?.email,
      phone_number: user?.phone_number === null ? "" : user?.phone_number,
      address: user?.address,
      job_functional: user?.job_functional === null ? "" : user?.job_functional,
      affiliate_campus:
        user?.affiliate_campus === null ? "" : user?.affiliate_campus,
      fakultas_id: user?.fakultas_id === null ? "" : user?.fakultas_id,
      prodi_id: user?.prodi_id === null ? "" : user?.prodi_id,
      // scholar_id: user?.scholar_id === null ? "" : user?.scholar_id,
      scopus_id: user?.scopus_id === null ? "" : user?.scopus_id,
    },
  })

  const { data: fakultas } = useGetFakultasList()
  const watchFakultas = form.watch("fakultas_id")
  const { data: prodi } = useGetProdiList(watchFakultas)

  const { mutate } = useUpdateProfile({
    onSuccess: res => {
      if (!res.status) {
        return toast.error(res.message)
      }
      removeCookie("user")
      removeCookie("token")
      toast.success(res.message)
      refetch()
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

  const onSubmit = (data: ProfileType) => {
    mutate(data)
  }

  // const valueScholar = useAtomValue(scholarSearchAtom)
  // const [searchScholar] = useDebounce(valueScholar, 2000)
  // const { data: scholar } = useListScholarId(searchScholar)

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
              label='nama dengan gelar'
              name='name_with_title'
              control={form.control}
            />
            <InputField
              label='email'
              type='email'
              name='email'
              control={form.control}
            />
            <InputField
              label='No. HP'
              name='phone_number'
              control={form.control}
            />
            <InputField label='alamat' name='address' control={form.control} />
            <SelectField
              control={form.control}
              name='job_functional'
              label='Jabatan fungsional'
              options={jabatanFungsional}
            />
            <InputField
              label='kampus afiliasi'
              name='affiliate_campus'
              control={form.control}
            />
            <SelectField
              label='fakultas'
              name='fakultas_id'
              options={(fakultas?.data as IFakultas[]) || []}
              control={form.control}
            />
            <SelectField
              label='program studi'
              name='prodi_id'
              options={(prodi?.data as IProdi[]) || []}
              control={form.control}
            />
            {/* <SelectScholar
              label='scholar ID'
              name='scholar_id'
              options={(scholar?.data as ScholarData[]) || []}
              control={form.control}
            /> */}
            <InputField
              label='scopus ID'
              name='scopus_id'
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
