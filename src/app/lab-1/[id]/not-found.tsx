// src/app/lab-1/[id]/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <h1 className="text-xl font-semibold">Not found</h1>
      <Link className="underline" href="/lab-1">Back to explorer</Link>
    </main>
  );
}