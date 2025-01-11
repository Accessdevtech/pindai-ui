import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password minimal 6 karakter",
  }),
});

export type RegisterType = z.infer<typeof registerSchema>;
