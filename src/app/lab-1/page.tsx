// src/app/lab-1/page.tsx

import { getFilms } from "@/lib/ghibli/films";
import FilmGrid from "@/components/lab-1/film-grid";

export default async function Lab1Page() {
  const films = await getFilms();

  return (
    <main className="page stack-6">
      <header className="stack-2">
        <h1 className="text-2xl font-semibold">Ghibli Explorer</h1>
        <p className="text-neutral-600">Pick a film. Pretend you’re building Netflix.</p>
      </header>

      <FilmGrid films={films} />
    </main>
  );
}