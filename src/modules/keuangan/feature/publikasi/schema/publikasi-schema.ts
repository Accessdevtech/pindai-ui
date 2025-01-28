import { z } from "zod"

export const publikasiSchema = z.object({
  judul: z.string(),
  jenis_publikasi: z.string(),
  tanggal_publikasi: z.date().or(z.string()),
  tahun: z.string(),
  author: z.string(),
  jurnal: z.string(),
  link_publikasi: z.string(),
  luaran_kriteria: z.string(),
})

export type PublikasiType = z.infer<typeof publikasiSchema>
