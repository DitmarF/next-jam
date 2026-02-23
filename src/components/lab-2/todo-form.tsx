// src/app/lab-2/todo-form.tsx
"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50"
    >
      {pending ? "Adding..." : "Add"}
    </button>
  );
}

export default function TodoForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="flex gap-2">
      <input
        name="text"
        placeholder="Add a todo..."
        className="w-full rounded-md border px-3 py-2"
        autoComplete="off"
      />
      <SubmitButton />
    </form>
  );
}