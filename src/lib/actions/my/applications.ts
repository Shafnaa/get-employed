"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createApplication(data: {
  title: string;
  description: string;
  city_id: number;
  status_id: number;
  company_id: number;
  work_type_id: number;
  experience_level_id: number;
}) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("applications").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getApplications() {
  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("applications")
    .select(
      "*, cities(*, countries(*)), experienceLevels:experience_levels(*), workTypes:work_types(*), status(*)"
    );

  if (error) {
    redirect("/error");
  }

  return data;
}

export async function updateApplication(
  id: string,
  data: {
    title?: string;
    description?: string;
    city_id?: number;
    experience_level_id?: number;
    work_type_id?: number;
    status_id?: number;
  }
) {
  const supabase = await createClientServer();

  const { error } = await supabase
    .from("applications")
    .update(data)
    .match({ id });

  if (error) {
    redirect("/error");
  }
}

export async function deleteApplication(id: string) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("applications").delete().match({ id });

  if (error) {
    redirect("/error");
  }
}

export async function getApplicationById(id: string) {
  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("applications")
    .select(
      "*, cities(*, countries(*)), experienceLevels:experience_levels(*), workTypes:work_types(*), status(*)"
    )
    .match({ id })
    .single();

  if (error) {
    redirect("/error");
  }

  return data;
}
