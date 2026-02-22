// src/lib/ghibli/films.ts

import { FilmDetailResponseSchema, FilmListResponseSchema, type Film } from "./schemas";

const BASE = "https://ghibli-api.vercel.app/api";

async function fetchJson(url: string) {

    const res = await fetch(url, {

        // pick ONE caching behavior for the lab:
        next: { revalidate: 60 * 60 }, // 1 hour
    

    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function getFilms(): Promise<Film[]> {

    const json = await fetchJson(`${BASE}/films`);
    const parsed = FilmListResponseSchema.parse(json);

    return parsed.data;
}

export async function getFilmById(id: string): Promise<Film> {
    const json = await fetchJson(`${BASE}/films/${id}`);
    const parsed = FilmDetailResponseSchema.parse(json);
    return parsed.data;
}