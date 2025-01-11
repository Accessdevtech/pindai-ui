import { z } from "zod";

export const profileSchema = z.object({
  nidn: z.string().optional(),
  name: z.string().min(1),
  name_with_title: z.string().min(1),
  email: z.string().email(),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  job_functional: z.string().optional(),
  affiliate_campus: z.string().optional(),
  fakultas_id: z.string(),
  prodi_id: z.string(),
  scholar_id: z.string().optional(),
  scopus_id: z.string().optional(),
});

export type ProfileType = z.infer<typeof profileSchema>;
