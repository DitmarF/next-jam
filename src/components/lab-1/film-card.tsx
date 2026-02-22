import Link from "next/link";
import Image from "next/image";
import type { Film } from "@/lib/ghibli/schemas";

export default function FilmCard({ film }: { film: Film }) {
  return (
    <Link
      href={`/lab-1/${film.id}`}
      className="group rounded-lg border p-3 hover:bg-neutral-50"
    >
        
        <article className="group rounded-lg border p-3 hover:bg-neutral-50">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-neutral-100">
                <Image
                src={film.image}
                alt={film.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition"
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                />
            </div>

            <div className="mt-3 space-y-1">
                <div className="font-semibold">{film.title}</div>
                <div className="text-sm text-neutral-600">
                {film.release_date} · Dir. {film.director}
                </div>
            </div>
        </article>
      
    </Link>
  );
}