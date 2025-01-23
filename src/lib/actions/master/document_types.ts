"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createDocumentType(data: { name: string }) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("document_types").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getDocumentTypes() {
  const supabase = await createClientServer();

  const { data, error } = await supabase.from("document_types").select("*");

  if (error) {
    redirect("/error");
  }

  return data;
}
