import { describe, expect, it } from "vitest";
import { parseSearch } from "@/lib/ghibli/search";

describe("parseSearch", () => {
  it("applies defaults when params are missing", () => {
    expect(parseSearch({})).toEqual({
      q: "",
      director: "",
      year: "",
      sort: "title",
    });
  });

  it("takes the first value when query param is an array", () => {
    expect(
      parseSearch({
        q: ["hello", "ignored"],
        director: ["Miyazaki", "ignored"],
        year: ["1986", "1997"],
        sort: ["score", "title"],
      })
    ).toEqual({
      q: "hello",
      director: "Miyazaki",
      year: "1986",
      sort: "score",
    });
  });

  it("rejects invalid year formats", () => {
    expect(() => parseSearch({ year: "86" })).toThrow();
    expect(() => parseSearch({ year: "abcd" })).toThrow();
    expect(() => parseSearch({ year: "19865" })).toThrow();
  });

  it("accepts empty year and valid 4-digit year", () => {
    expect(parseSearch({ year: "" }).year).toBe("");
    expect(parseSearch({ year: "2001" }).year).toBe("2001");
  });
});