"use client"
import ForgotPasswordFormEmail from "@/modules/auth/forgot-password-form-email"
import ForgotPasswordFormReset from "@/modules/auth/forgot-password-form-reset"
import { useSearchParams } from "next/navigation"

export default function ForgotPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      {token ? (
        <ForgotPasswordFormReset token={token} />
      ) : (
        <ForgotPasswordFormEmail />
      )}
    </div>
  )
}
