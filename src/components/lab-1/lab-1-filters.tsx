"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SearchParams } from "@/lib/ghibli/search";

const DEBOUNCE_MS = 300;

type FilterState = Pick<SearchParams, "q" | "director" | "year" | "sort">;
type Lab1FiltersProps = FilterState;

function buildSearchString(params: FilterState): string {
  const sp = new URLSearchParams();
  if (params.q.trim()) sp.set("q", params.q.trim());
  if (params.director.trim()) sp.set("director", params.director.trim());
  if (params.year.trim()) sp.set("year", params.year.trim());
  if (params.sort && params.sort !== "title") sp.set("sort", params.sort);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export default function Lab1Filters({
  q,
  director,
  year,
  sort,
}: Lab1FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [localQ, setLocalQ] = useState(q);
  const [localDirector, setLocalDirector] = useState(director);
  const [localYear, setLocalYear] = useState(year);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalQ(q);
    setLocalDirector(director);
    setLocalYear(year);
  }, [q, director, year]);

  const pushParams = useCallback(
    (params: FilterState) => {
      router.replace(pathname + buildSearchString(params));
    },
    [pathname, router]
  );

  const schedulePush = useCallback(
    (next: FilterState) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        pushParams(next);
      }, DEBOUNCE_MS);
    },
    [pushParams]
  );

  return (
    <div className="section stack-4" role="search">
      <div className="grid gap-3 sm:grid-cols-4">
        <label className="sr-only" htmlFor="lab1-q">
          Search title
        </label>
        <input
          id="lab1-q"
          type="search"
          value={localQ}
          onChange={(e) => {
            const v = e.target.value;
            setLocalQ(v);
            schedulePush({
              q: v,
              director: localDirector,
              year: localYear,
              sort,
            });
          }}
          placeholder="Search title…"
          className="border rounded px-3 py-2 sm:col-span-2"
          autoComplete="off"
        />
        <label className="sr-only" htmlFor="lab1-director">
          Director
        </label>
        <input
          id="lab1-director"
          type="text"
          value={localDirector}
          onChange={(e) => {
            const v = e.target.value;
            setLocalDirector(v);
            schedulePush({ q: localQ, director: v, year: localYear, sort });
          }}
          placeholder="Director…"
          className="border rounded px-3 py-2"
          autoComplete="off"
        />
        <label className="sr-only" htmlFor="lab1-year">
          Year
        </label>
        <input
          id="lab1-year"
          type="text"
          inputMode="numeric"
          value={localYear}
          onChange={(e) => {
            const v = e.target.value;
            setLocalYear(v);
            schedulePush({ q: localQ, director: localDirector, year: v, sort });
          }}
          placeholder="Year…"
          className="border rounded px-3 py-2"
          autoComplete="off"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="sr-only" htmlFor="lab1-sort">
          Sort by
        </label>
        <select
          id="lab1-sort"
          value={sort}
          onChange={(e) => {
            const v = e.target.value as "title" | "year" | "score";
            pushParams({
              q: localQ,
              director: localDirector,
              year: localYear,
              sort: v,
            });
          }}
          className="border rounded px-3 py-2"
          aria-label="Sort by"
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="score">Score</option>
        </select>

        <a
          className="text-sm underline"
          href="/lab-1"
          onClick={(e) => {
            e.preventDefault();
            router.push("/lab-1");
          }}
        >
          Clear
        </a>
      </div>
    </div>
  );
}
