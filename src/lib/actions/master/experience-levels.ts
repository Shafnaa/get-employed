"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createExperienceLevel(data: { name: string }) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("experience_levels").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getExperienceLevels() {
  const supabase = await createClientServer();

  const { data, error } = await supabase.from("experience_levels").select("*");

  if (error) {
    redirect("/error");
  }

  return data;
}
