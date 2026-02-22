// src/app/lab-1/error.tsx

"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="page">
      <h1 className="text-xl font-semibold">Something broke</h1>
      <p className="text-neutral-600">{error.message}</p>
    </main>
  );
}