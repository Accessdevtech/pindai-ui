"use client"
import InputField from "@/components/atom/input-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/contexts/auth-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema, LoginType } from "../schema/login.schema"

export default function LoginForm() {
  const { login } = useAuthContext()
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: LoginType) => {
    await login(data)
  }
  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField
        label='email'
        type='email'
        name='email'
        control={form.control}
      />
      <InputField
        label='password'
        forgotPassword
        type='password'
        name='password'
        control={form.control}
      />

      <Button type='submit' className='' disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Mengirim..." : "Masuk"}
      </Button>
    </Form>
  )
}
