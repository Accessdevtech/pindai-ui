import { z } from "zod"

export const masterLuaranSchema = z.object({
  name: z.string(),
  nominal: z.number(),
})

export type MasterLuaranType = z.infer<typeof masterLuaranSchema>
