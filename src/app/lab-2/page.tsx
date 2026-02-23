// src/app/lab-2/page.tsx

// src/app/lab-2/page.tsx
import { listTodos } from "@/lib/todo/store";
import { addTodo, deleteTodo } from "./actions";
import TodoForm from "@/components/lab-2/todo-form";

export default function Lab2Page() {
  const todos = listTodos();

  return (
    <div className="page space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold">Lab 2: Todo</h1>
        <p className="text-neutral-600">
          Forms + Server Actions. The thrilling saga of adding and deleting strings.
        </p>
      </header>

      <TodoForm action={addTodo} />

      {todos.length === 0 ? (
        <p className="text-neutral-600">No todos yet. Add one. Feel accomplished.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((t) => (
            <li key={t.id} className="flex items-center justify-between rounded-md border p-3">
              <span className="truncate">{t.text}</span>

              <form action={deleteTodo}>
                <input type="hidden" name="id" value={t.id} />
                <button
                  className="rounded-md px-3 py-1 text-sm text-red-700 hover:bg-red-50"
                  type="submit"
                >
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}