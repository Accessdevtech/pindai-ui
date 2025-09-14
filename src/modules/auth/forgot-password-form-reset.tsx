import InputField from "@/components/atom/input-field"
import Form from "@/components/molecules/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import AuthCard from "./components/auth-card"
import { useForgotPasswordReset } from "./hooks/use-forgot-password"
import {
  forgotPasswordResetSchema,
  ForgotPasswordResetType
} from "./schema/forgot-password.schema"

interface ForgotPasswordFormResetProps {
  token: string
}

export default function ForgotPasswordFormReset({
  token
}: ForgotPasswordFormResetProps) {
  const decode = atob(token)
  const split = decode.split("|")
  const email = split[1]
  const tokenSplit = split[0]
  const router = useRouter()
  const form = useForm<ForgotPasswordResetType>({
    resolver: zodResolver(forgotPasswordResetSchema),
    defaultValues: {
      email,
      token: tokenSplit,
      password: "",
      password_confirmation: ""
    }
  })

  const { mutate } = useForgotPasswordReset({
    onSuccess: res => {
      toast.success(res.message)
      form.reset()
      return router.push("/")
    },
    onError: err => {
      if (err.response?.data.errors) {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          form.setError(key as keyof ForgotPasswordResetType, {
            message: value as string,
            type: "manual"
          })
        }
      }
      toast.error(err.response?.data.message)
    }
  })

  const onSubmit = (values: ForgotPasswordResetType) => {
    mutate(values)
  }

  return (
    <AuthCard
      title='Forgot Password'
      description='Silahkan masukkan email untuk mengatur ulang password'
    >
      <Form form={form} onSubmit={onSubmit}>
        <InputField
          label='Password'
          type='password'
          name='password'
          control={form.control}
        />
        <InputField
          label='Confirm Password'
          type='password'
          name='password_confirmation'
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
