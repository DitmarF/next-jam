// src/app/lab-1/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page stack-4">
      <h1 className="text-xl font-semibold">Not found</h1>
      <Link className="underline" href="/lab-1">Back to explorer</Link>
    </main>
  );
}