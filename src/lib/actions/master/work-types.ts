"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createWorkType(data: { name: string }) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("work_types").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getWorkTypes() {
  const supabase = await createClientServer();

  const { data, error } = await supabase.from("work_types").select("*");

  if (error) {
    redirect("/error");
  }

  return data;
}
