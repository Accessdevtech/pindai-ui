import { z } from "zod"

export const kriteriaSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  nominal: z.number(),
  keterangan: z.string(),
})

export type KriteriaType = z.infer<typeof kriteriaSchema>

export const masterLuaranSchema = z.object({
  name: z.string(),
  category: z.string(),
  kriteria: z.array(kriteriaSchema),
})

export type MasterLuaranType = z.infer<typeof masterLuaranSchema>
