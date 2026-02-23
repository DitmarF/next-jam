// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import { addEvent, clearEvents, listEvents } from "@/lib/inbox/store";

beforeEach(() => {
  clearEvents();
  vi.spyOn(Date, "now").mockReturnValue(1700000000000);
  vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue("uuid-1");
});

describe("inbox store", () => {
  it("adds event with id and ts and puts newest first", () => {
    addEvent({ source: "test", type: "ping", payload: { a: 1 } });
    // second event with different uuid
    (globalThis.crypto.randomUUID as any).mockReturnValueOnce("uuid-2");
    (Date.now as any).mockReturnValueOnce(1700000001111);
    addEvent({ source: "test", type: "pong", payload: { b: 2 } });

    const events = listEvents();
    expect(events).toHaveLength(2);
    expect(events[0]).toMatchObject({ id: "uuid-2", ts: 1700000001111, type: "pong" });
    expect(events[1]).toMatchObject({ id: "uuid-1", ts: 1700000000000, type: "ping" });
  });

  it("respects limit", () => {
    (globalThis.crypto.randomUUID as any).mockReturnValue("uuid");
    for (let i = 0; i < 60; i++) addEvent({ source: "s", type: "t", payload: i });

    expect(listEvents({ limit: 50 })).toHaveLength(50);
  });

  it("clearEvents empties the list", () => {
    addEvent({ source: "s", type: "t", payload: {} });
    clearEvents();
    expect(listEvents()).toHaveLength(0);
  });
});