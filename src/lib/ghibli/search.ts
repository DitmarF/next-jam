// src/lib/ghibli/search.ts
import { z } from "zod";

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

const SearchSchema = z.object({
  q: z.string().optional().default(""),
  director: z.string().optional().default(""),
  year: z
    .union([z.literal(""), z.string().regex(/^\d{4}$/)])
    .optional()
    .default(""),
  sort: z.enum(["title", "year", "score"]).optional().default("title"),
});

export type SearchParams = z.infer<typeof SearchSchema>;

export function parseSearch(
  sp: { [k: string]: string | string[] | undefined }
): SearchParams {
  return SearchSchema.parse({
    q: first(sp.q),
    director: first(sp.director),
    year: first(sp.year),
    sort: first(sp.sort),
  });
}