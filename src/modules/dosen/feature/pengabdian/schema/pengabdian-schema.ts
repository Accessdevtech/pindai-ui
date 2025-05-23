import { z } from "zod"

export const pengabdianSchema = z.object({
  tahun_akademik: z.string(),
  semester: z.string(),
  judul: z.string(),
  bidang: z.string(),
  deskripsi: z.string(),
  jenis_pengabdian: z.string(),
  luaran_kriteria: z.string(),
})

export type PengabdianType = z.infer<typeof pengabdianSchema>
