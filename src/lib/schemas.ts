import { z } from "zod"

export const loginSchema = z.object({
  email: z.email({ message: "Email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
})

export const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Nama lengkap minimal 2 karakter." }),
  email: z.email({ message: "Email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
})

export const journalSchema = z.object({
  title: z.string().max(100).optional(),
  content: z
    .string()
    .min(1, "cerita tidak boleh kosong")
    .min(10, "cerita terlalu singkat"),
  mood: z.string().emoji("mood harus berupa emoji"),
})