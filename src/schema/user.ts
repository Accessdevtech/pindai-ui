import { z } from "zod"

export const userSchema = z.object({
  nidn: z.string().refine(nidn => nidn.length > 0, "NIDN harus diisi"),
  name: z.string().refine(name => name.length > 0, "Nama harus diisi"),
  email: z.string().refine(email => email.length > 0, "Email harus diisi"),
  address: z.string(),
})

export type UserType = z.infer<typeof userSchema>

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(8),
    new_password: z.string().min(8),
    new_password_confirmation: z.string().min(8),
  })
  .refine(
    ({ new_password, new_password_confirmation }) =>
      new_password === new_password_confirmation,
    {
      message: "Password tidak sama",
      path: ["new_password_confirmation"],
    },
  )

export type ChangePasswordType = z.infer<typeof changePasswordSchema>
