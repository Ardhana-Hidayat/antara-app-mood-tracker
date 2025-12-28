"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/lib/schemas";

type LoginInput = z.infer<typeof loginSchema>;
type RegisterInput = z.infer<typeof registerSchema>;

export async function loginAction(values: LoginInput) {
  const validated = loginSchema.safeParse(values);
  if (!validated.success) {
    return { error: "Input tidak valid." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    return { error: error.message }; 
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function registerAction(values: RegisterInput) {
  const validated = registerSchema.safeParse(values);
  if (!validated.success) {
    return { error: "Input tidak valid." };
  }

  const supabase = await createSupabaseServerClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL;

  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: values.fullName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect("/login")
}