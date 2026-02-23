// src/app/lab-1/page.tsx

import { getFilms } from "@/lib/ghibli/films";
import { parseSearch } from "@/lib/lab-1/search";
import FilmGrid from "@/components/lab-1/film-grid";
import Lab1Filters from "@/components/lab-1/lab-1-filters";

export default async function Lab1Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

    const params = await searchParams;
    const { q, director, year, sort } = parseSearch(params);
    const films = await getFilms();
    const qNorm = q.trim().toLowerCase();

    let result = films.filter((f) => {

        const matchesQ = !qNorm || f.title.toLowerCase().includes(qNorm);
        const matchesDirector = !director.trim() || f.director.toLowerCase().includes(director.trim().toLowerCase());
        const matchesYear = !year.trim() || f.release_date === year.trim();
        return matchesQ && matchesDirector && matchesYear;

    });

    result.sort((a, b) => {

        if (sort === "title") return a.title.localeCompare(b.title);
        if (sort === "year") return Number(a.release_date) - Number(b.release_date);
        return Number(b.rt_score) - Number(a.rt_score);
    });

    return (

        <main className="page">
        <header className="">
            <h1 className="text-2xl font-semibold">Ghibli Explorer</h1>
            <p className="text-neutral-600">Pick a film. Pretend you’re building Netflix.</p>
        </header>

        <Lab1Filters q={q} director={director} year={year} sort={sort} />

        <FilmGrid films={result} />
        </main>

    );
}