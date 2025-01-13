"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClientServer();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function register(formData: FormData) {
  const supabase = await createClientServer();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function loginWithGoogle() {
  const supabase = await createClientServer();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
    },
  });

  if (data.url && !error) {
    redirect(data.url); // use the redirect API for your server framework
  }

  redirect("/error");
}
