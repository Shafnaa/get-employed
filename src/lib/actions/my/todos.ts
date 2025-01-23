"use server";

import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export async function createTodo(data: {
  application_id: string;
  title: string;
  description?: string;
  due_date?: string;
}) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("todos").insert([data]);

  if (error) {
    redirect("/error");
  }
}

export async function getTodos() {
  const supabase = await createClientServer();

  const { data, error } = await supabase.from("todos").select("*");

  if (error) {
    redirect("/error");
  }

  return data;
}

export async function updateTodo(
  id: string,
  data: {
    title?: string;
    description?: string;
    due_date?: string;
    status?: boolean;
  }
) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("todos").update(data).match({ id });

  if (error) {
    redirect("/error");
  }
}

export async function deleteTodo(id: string) {
  const supabase = await createClientServer();

  const { error } = await supabase.from("todos").delete().match({ id });

  if (error) {
    redirect("/error");
  }
}

export async function getTodosByApplicationId(application_id: string) {
  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .match({ application_id });

  if (error) {
    redirect("/error");
  }

  return data;
}

export async function getTodoById(id: string) {
  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .match({ id });

  if (error) {
    redirect("/error");
  }

  return data;
}
