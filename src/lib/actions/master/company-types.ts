"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createCompanyType(data: { name: string }) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("company_types").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getCompanyTypes() {
  const supabase = await createClientServer();

  const { data, error } = await supabase.from("company_types").select("*");

  if (error) {
    redirect("/error");
  }

  return data;
}
