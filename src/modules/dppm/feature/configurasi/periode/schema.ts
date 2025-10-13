import { z } from "zod"

export const periodeSchema = z.object({
  name: z.string().min(1, "nama periode harus diisi"),
  start_date: z.date().or(z.string().min(1, "tanggal mulai harus diisi")),
  end_date: z.date().or(z.string().min(1, "tanggal selesai harus diisi")),
  status: z.enum(["active", "close", "draft"]).default("draft")
})

export type PeriodeType = z.infer<typeof periodeSchema>
