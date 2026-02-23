// src/app/lab-2/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createTodo, deleteTodoById } from "@/lib/todo/store";

export async function addTodo(formData: FormData) {
  const text = String(formData.get("text") ?? "");
  createTodo(text);
  revalidatePath("/lab-2");
}

export async function deleteTodo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (id) deleteTodoById(id);
  revalidatePath("/lab-2");
}