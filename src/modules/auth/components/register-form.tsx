"use client"
import InputField from "@/components/atom/input-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRegister } from "../hooks/use-register"
import { RegisterType, registerSchema } from "../schema/register.schema"

interface RegisterFormProps {
  onClose: () => void
}

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const { mutate } = useRegister({
    onSuccess: res => {
      if (!res.status) {
        return toast.error(res.data.message)
      }
      toast.success(res.data.message)
      onClose()
    },
    onError: err => {
      if (err.response?.data.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          form.setError(key as keyof RegisterType, {
            message: value as string,
            type: "manual",
          })
        }
      }
      // toast.error(err.response?.data.message);
    },
  })

  const onSubmit = async (data: RegisterType) => {
    mutate(data)
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField label='Nama' name='name' control={form.control} />
      <InputField
        label='Email'
        name='email'
        type='email'
        control={form.control}
      />
      <InputField
        label='Password'
        name='password'
        type='password'
        control={form.control}
      />

      <Button type='submit' disabled={form.formState.isSubmitting}>
        Register
      </Button>
    </Form>
  )
}
