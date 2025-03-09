import { z } from "zod"

export const prodiSchema = z.object({
  name: z.string().min(1),
  fakultas_id: z.string(),
})

export type ProdiType = z.infer<typeof prodiSchema>
