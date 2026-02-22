// src/app/lab-1/[id]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFilmById } from "@/lib/ghibli/films";

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const film = await getFilmById(id);

    return (
      <main className="page stack-6">
        <Link className="text-sm text-neutral-600 hover:underline" href="/lab-1">
          ← Back to explorer
        </Link>

        <header className="stack-4">
          <h1 className="text-3xl font-semibold">{film.title}</h1>

          <div className="relative aspect-[16/6] w-full overflow-hidden rounded-lg bg-neutral-100">
            <Image
              src={film.movie_banner}
              alt={`${film.title} banner`}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <p className="text-neutral-700 leading-relaxed">{film.description}</p>

          <ul className="text-sm text-neutral-600 space-y-1">
            <li>Director: {film.director}</li>
            <li>Release: {film.release_date}</li>
            <li>RT score: {film.rt_score}</li>
            <li>Runtime: {film.running_time} min</li>
          </ul>
        </header>
      </main>
    );
  } catch {
    // If the API returns 404 or validation fails, treat it as "not found"
    notFound();
  }
}