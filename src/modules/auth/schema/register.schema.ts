import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password minimal 8 karakter",
  }),
  fakultas_id: z.string().min(1, {
    message: "Fakultas tidak boleh kosong",
  }),
  prodi_id: z.string().min(1, {
    message: "Prodi tidak boleh kosong",
  }),
})

export type RegisterType = z.infer<typeof registerSchema>
