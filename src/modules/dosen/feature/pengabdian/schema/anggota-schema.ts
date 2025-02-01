import { z } from "zod"

export const anggotaSchema = z.object({
  nidn: z.string().refine(nidn => nidn.length > 0, "NIDN harus diisi"),
  name: z.string().refine(name => name.length > 0, "Nama harus diisi"),
  name_with_title: z
    .string()
    .refine(name => name.length > 0, "Nama dengan gelar harus diisi"),
  prodi: z.string().refine(prodi => prodi.length > 0, "Prodi harus diisi"),
  phone_number: z
    .string()
    .refine(phone => phone.length > 0, "Nomor telepon harus diisi"),
  email: z.string().refine(email => email.length > 0, "Email harus diisi"),
  scholar_id: z.string(),
  scopus_id: z.string(),
  job_functional: z
    .string()
    .refine(job => job.length > 0, "Jabatan fungsional harus diisi"),
  affiliate_campus: z
    .string()
    .refine(affiliate => affiliate.length > 0, "Affiliate harus diisi"),
})

export type AnggotaType = z.infer<typeof anggotaSchema>
