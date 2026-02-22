// src/lib/ghibli/schemas.ts

import { z } from "zod";

export const FilmSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  director: z.string(),
  producer: z.string(),
  release_date: z.string(),
  running_time: z.string(),
  rt_score: z.string(),
  image: z.url(),
  movie_banner: z.url(),
  url: z.url(),
});

export const FilmListResponseSchema = z.object({
  data: z.array(FilmSchema),
});

export const FilmDetailResponseSchema = z.object({
  data: FilmSchema,
});

export type Film = z.infer<typeof FilmSchema>;