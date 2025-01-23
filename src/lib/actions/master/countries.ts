"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createCountry(data: { name: string }) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("countries").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getCountries() {
  const supabase = await createClientServer();

  const { data, error } = await supabase.from("countries").select("*");

  if (error) {
    redirect("/error");
  }

  return data;
}
