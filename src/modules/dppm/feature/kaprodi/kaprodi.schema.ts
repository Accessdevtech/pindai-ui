import { z } from "zod"

export const kaprodiSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  nidn: z.string().optional(),
  address: z.string().optional(),
  fakultas_id: z.string(),
  status: z.enum(["false", "true"]).default("true"),
})

export type KaprodiType = z.infer<typeof kaprodiSchema>
