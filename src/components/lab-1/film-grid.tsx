import type { Film } from "@/lib/ghibli/schemas";
import FilmCard from "./film-card";

export default function FilmGrid({ films }: { films: Film[] }) {

  if (films.length === 0) {
    return <p className="text-neutral-600">No films found.</p>;
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </section>
  );
  
}