// @vitest-environment node
import { describe, expect, it } from "vitest";
import { FilmSchema, FilmListResponseSchema } from "@/lib/ghibli/schemas";

const film = {
  id: "1",
  title: "Castle in the Sky",
  description: "Floating rocks, human drama.",
  director: "Hayao Miyazaki",
  producer: "Isao Takahata",
  release_date: "1986",
  running_time: "124",
  rt_score: "95",
  image: "https://example.com/image.jpg",
  movie_banner: "https://example.com/banner.jpg",
  url: "https://example.com/film",
};

describe("ghibli schemas", () => {
  it("parses a valid Film", () => {
    expect(FilmSchema.parse(film)).toEqual(film);
  });

  it("rejects invalid URLs", () => {
    expect(() => FilmSchema.parse({ ...film, image: "not-a-url" })).toThrow();
  });

  it("parses a list response", () => {
    const json = { data: [film] };
    expect(FilmListResponseSchema.parse(json).data).toHaveLength(1);
  });

  it("rejects a list response missing data", () => {
    expect(() => FilmListResponseSchema.parse({ nope: [] })).toThrow();
  });
});