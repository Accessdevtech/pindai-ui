"use client"
import InputField from "@/components/atom/input-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import AuthCard from "./components/auth-card"
import { useForgotPasswordEmail } from "./hooks/use-forgot-password"
import {
  ForgotPasswordEmailType,
  forgotPasswordEmailSchema
} from "./schema/forgot-password.schema"

export default function ForgotPasswordFormEmail() {
  const form = useForm<ForgotPasswordEmailType>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: {
      email: ""
    }
  })

  const { mutate } = useForgotPasswordEmail({
    onSuccess: res => {
      toast.success(res.message)
      form.reset()
    },
    onError: err => {
      if (err.response?.data.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          form.setError(key as keyof ForgotPasswordEmailType, {
            message: value as string,
            type: "manual"
          })
        }
      }
    }
  })

  const onSubmit = (values: ForgotPasswordEmailType) => {
    mutate(values)
  }

  return (
    <AuthCard
      title='Forgot Password'
      description='Silahkan masukkan email untuk mengatur ulang password'
    >
      <Form form={form} onSubmit={onSubmit}>
        <InputField
          label='email'
          type='email'
          name='email'
          control={form.control}
        />

        <Button
          type='submit'
          className=''
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Mengirim..." : "Submit"}
        </Button>
      </Form>
    </AuthCard>
  )
}
