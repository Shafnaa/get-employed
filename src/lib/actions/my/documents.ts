"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createDocuments(data: {
  title: string;
  document_url: string;
  document_type_id: number;
}) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("documents").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getDocuments() {
  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("documents")
    .select("*, documentTypes:document_types(*)");

  if (error) {
    redirect("/error");
  }

  return data;
}

export async function updateDocuments(
  id: string,
  data: {
    title?: string;
    document_url?: string;
    document_type_id?: number;
  }
) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("documents").update(data).match({ id });

  if (error) {
    redirect("/error");
  }
}

export async function deleteDocuments(id: string) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("documents").delete().match({ id });

  if (error) {
    redirect("/error");
  }
}

export async function getDocumentById(id: string) {
  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("documents")
    .select("*, documentTypes:document_types(*)")
    .match({ id })
    .single();

  if (error) {
    redirect("/error");
  }

  return data;
}
