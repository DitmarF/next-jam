// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">

      <section className="section space-y-4">
        <h1>Next Jam</h1>
        <p>
          Home page. Three labs. Mild suffering. Maximum learning.
        </p>
      </section>

    <section className="section space-y-4">
      <Link href="/lab-1">Lab 1</Link>
    </section>
    <section className="section space-y-4">
      <Link href="/lab-2">Lab 2</Link>
    </section>
    <section className="section space-y-4">
      <Link href="/lab-3">Lab 3</Link>
    </section>

    </main>
  );
}