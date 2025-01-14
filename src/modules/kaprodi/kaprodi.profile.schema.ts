import { z } from "zod"

export const profileSchema = z.object({
  nidn: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string().optional(),
  fakultas_id: z.string(),
})

export type ProfileType = z.infer<typeof profileSchema>
