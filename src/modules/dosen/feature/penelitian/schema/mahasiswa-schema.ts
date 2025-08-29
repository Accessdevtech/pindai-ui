import { z } from "zod"

export const mahasiswaSchema = z.object({
  nim: z.string().refine(nim => nim.length > 0, "NIM harus diisi"),
  name: z.string().refine(name => name.length > 0, "Nama harus diisi"),
  fakultas: z
    .string()
    .refine(fakultas => fakultas.length > 0, "Fakultas harus diisi"),
  prodi: z.string().refine(prodi => prodi.length > 0, "Prodi harus diisi")
})

export type MahasiswaSchemaType = z.infer<typeof mahasiswaSchema>
