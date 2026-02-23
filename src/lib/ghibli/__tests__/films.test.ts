// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { getFilmById, getFilms } from "@/lib/ghibli/films";

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

function mockFetchOk(json: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => json,
    }))
  );
}

function mockFetchFail(status = 500, statusText = "Boom") {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: false,
      status,
      statusText,
      json: async () => ({}),
    }))
  );
}

afterEach(() => {
  vi.unstubAllGlobals(); // stubGlobal doesn't auto-reset unless configured
});

describe("ghibli films", () => {
  it("getFilms fetches and returns parsed films", async () => {
    mockFetchOk({ data: [film] });

    const result = await getFilms();
    expect(result).toEqual([film]);

    expect(fetch).toHaveBeenCalledWith(
      "https://ghibli-api.vercel.app/api/films",
      expect.objectContaining({
        next: { revalidate: 60 * 60 },
      })
    );
  });

  it("getFilmById fetches and returns parsed film", async () => {
    mockFetchOk({ data: film });

    const result = await getFilmById("1");
    expect(result).toEqual(film);

    expect(fetch).toHaveBeenCalledWith(
      "https://ghibli-api.vercel.app/api/films/1",
      expect.any(Object)
    );
  });

  it("throws a helpful error when fetch is not ok", async () => {
    mockFetchFail(404, "Not Found");
    await expect(getFilms()).rejects.toThrow("Request failed: 404 Not Found");
  });

  it("throws when response shape is invalid (Zod parse fails)", async () => {
    mockFetchOk({ wrong: "shape" });
    await expect(getFilms()).rejects.toThrow();
  });
});