import { z } from "zod"

export const pengabdianSchema = z.object({
  tahun_akademik: z.string(),
  semester: z.string(),
  judul: z.string(),
  bidang: z.string(),
  deskripsi: z.string(),
  jenis_pengabdian: z.string(),
  jenis_indeksasi: z.string(),
  // anggota: z.array(anggotaSchema),
  // anggotas: z.any(),
})

export type PengabdianType = z.infer<typeof pengabdianSchema>
