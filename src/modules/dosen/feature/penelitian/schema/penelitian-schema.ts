import { z } from "zod";

export const penelitianSchema = z.object({
  tahun_akademik: z.string(),
  semester: z.string(),
  judul: z.string(),
  deskripsi: z.string(),
  jenis_penelitian: z.string(),
  jenis_indeksasi: z.string(),
});

export type PenelitianType = z.infer<typeof penelitianSchema>;
