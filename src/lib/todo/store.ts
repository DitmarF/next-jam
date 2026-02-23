// src/lib/todo/store.ts
import { z } from "zod";

export type Todo = {
  id: string;
  text: string;
  createdAt: number;
};

const TodoTextSchema = z.string().trim().min(1, "Required").max(120, "Too long");

// Module-scoped state (resets on server restart / redeploy)
let todos: Todo[] = [];

export function listTodos(): Todo[] {
  return todos;
}

export function createTodo(rawText: string): Todo {
  const text = TodoTextSchema.parse(rawText);
  const todo: Todo = { id: crypto.randomUUID(), text, createdAt: Date.now() };
  todos = [todo, ...todos];
  return todo;
}

export function deleteTodoById(id: string) {
  todos = todos.filter((t) => t.id !== id);
}