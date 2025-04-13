"use client"
import { useChangePassword } from "@/hooks/use-change-password"
import { changePasswordSchema, ChangePasswordType } from "@/schema/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import InputField from "../atom/input-field"
import Form from "../molecules/form"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"

export default function ChangePassword() {
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  })

  const { mutate } = useChangePassword({
    onSuccess: res => {
      toast.success(res.message)
      form.reset()
    },
    onError: err => {
      toast.error(err.response?.data.message)
    },
  })

  const onSubmit = (data: ChangePasswordType) => {
    mutate(data)
  }
  return (
    <Card>
      <CardHeader>
        <h1 className='text-lg font-semibold uppercase'>Ubah Sandi</h1>
      </CardHeader>
      <CardContent className='p-6'>
        <Form form={form} onSubmit={onSubmit}>
          <InputField
            control={form.control}
            label='Old Password'
            name='old_password'
            type='password'
          />
          <InputField
            control={form.control}
            label='New Password'
            name='new_password'
            type='password'
          />
          <InputField
            control={form.control}
            label='New Password Confirmation'
            name='new_password_confirmation'
            type='password'
          />
          <div className='flex justify-end'>
            <Button
              type='submit'
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className='px-8'
            >
              Simpan
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}
