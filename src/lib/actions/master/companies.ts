"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createCompany(data: {
  name: string;
  company_type_id: number;
}) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("companies").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getCompanies() {
  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("companies")
    .select("*, company_types(*)");

  if (error) {
    redirect("/error");
  }

  return data;
}
