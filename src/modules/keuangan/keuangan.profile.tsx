"use client"
import InputField from "@/components/atom/input-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { User } from "@/interface/type"
import { userSchema, UserType } from "@/schema/user"
import { removeCookie } from "@/services/storage/cookie-storage-service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useUpdateProfile } from "./hooks/use-profile"

export default function ProfileKeuangan({
  user,
  refetch,
}: {
  user: User
  refetch: () => void
}) {
  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nidn: user?.nidn || "",
      name: user?.name || "",
      email: user?.email || "",
      address: user?.address || "",
    },
  })

  const { mutate } = useUpdateProfile({
    onSuccess: res => {
      if (!res.status) {
        return toast.error(res.message)
      }
      if (res.data) {
        toast.success(res.message)
      }
      form.reset()
      refetch()
      removeCookie("token")
      removeCookie("user")
    },
    onError: err => {
      if (err.response?.data.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          form.setError(key as keyof UserType, {
            message: value as string,
            type: "manual",
          })
        }
      }
    },
  })

  const onSubmit = async (data: UserType) => {
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
