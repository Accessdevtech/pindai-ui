import { z } from "zod"

export const forgotPasswordEmailSchema = z.object({
  email: z.string().email()
})

export const forgotPasswordResetSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8)
})

export type ForgotPasswordEmailType = z.infer<typeof forgotPasswordEmailSchema>
export type ForgotPasswordResetType = z.infer<typeof forgotPasswordResetSchema>
