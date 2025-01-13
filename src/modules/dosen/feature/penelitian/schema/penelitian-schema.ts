import { z } from "zod"

export const penelitianSchema = z.object({
  tahun_akademik: z.string(),
  semester: z.string(),
  judul: z.string(),
  bidang: z.string(),
  deskripsi: z.string(),
  jenis_penelitian: z.string(),
  jenis_indeksasi: z.string(),
  // anggota: z.array(anggotaSchema),
  // anggotas: z.any(),
})

export type PenelitianType = z.infer<typeof penelitianSchema>
