import { z } from "zod";

export const anggotaSchema = z.object({
  nidn: z.string(),
  name: z.string(),
  name_with_title: z.string(),
  prodi: z.string(),
  phone_number: z.string(),
  email: z.string(),
  scholar_id: z.string(),
  scopus_id: z.string(),
  job_functional: z.string(),
  affiliate_campus: z.string(),
});

export type AnggotaType = z.infer<typeof anggotaSchema>;
