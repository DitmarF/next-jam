// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

async function freshStore() {
  vi.resetModules(); // reload module to reset `todos`
  return await import("@/lib/todo/store");
}

beforeEach(() => {
  vi.spyOn(Date, "now").mockReturnValue(1700000000000);
  vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue("todo-1");
});

describe("todo store", () => {
  it("createTodo trims and validates", async () => {
    const { createTodo } = await freshStore();
    const todo = createTodo("   buy milk   ");
    expect(todo).toMatchObject({ id: "todo-1", text: "buy milk", createdAt: 1700000000000 });
  });

  it("rejects empty todo", async () => {
    const { createTodo } = await freshStore();
    expect(() => createTodo("   ")).toThrow();
  });

  it("rejects too long todo", async () => {
    const { createTodo } = await freshStore();
    expect(() => createTodo("x".repeat(121))).toThrow();
  });

  it("listTodos returns newest first", async () => {
    const { createTodo, listTodos } = await freshStore();
    createTodo("first");
    (globalThis.crypto.randomUUID as any).mockReturnValueOnce("todo-2");
    (Date.now as any).mockReturnValueOnce(1700000001111);
    createTodo("second");

    const todos = listTodos();
    expect(todos[0].id).toBe("todo-2");
    expect(todos[1].id).toBe("todo-1");
  });

  it("deleteTodoById removes item", async () => {
    const { createTodo, deleteTodoById, listTodos } = await freshStore();
    createTodo("a");
    deleteTodoById("todo-1");
    expect(listTodos()).toEqual([]);
  });
});