"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createCity(data: { name: string; country_id: number }) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("cities").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getCities() {
  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("cities")
    .select("*, countries(*)");

  if (error) {
    redirect("/error");
  }

  return data;
}
