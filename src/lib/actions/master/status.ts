"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createStatus(data: { name: string }) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("status").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getStatuses() {
  const supabase = await createClientServer();

  const { data, error } = await supabase.from("status").select("*");

  if (error) {
    redirect("/error");
  }

  return data;
}
