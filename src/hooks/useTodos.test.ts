import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTodos } from "./useTodos";
import * as api from "../api/todoApi";
import { wrapper } from "./test-utils";

// 👇 BẮT BUỘC: mock cả module
vi.mock("../api/todoApi");

describe("useTodos", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("loads todos from API", async () => {
    vi.mocked(api.fetchTodos).mockResolvedValue([
      { id: 1, title: "From API", completed: false },
    ]);

    const { result } = renderHook(() => useTodos(), { wrapper });

    // chờ useEffect chạy xong
    await act(async () => {});

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe("From API");
  });

  it("optimistic add + reconcile", async () => {
    vi.mocked(api.fetchTodos).mockResolvedValue([]);
    vi.mocked(api.createTodo).mockResolvedValue({
      id: 99,
      title: "New todo",
      completed: false,
    });

    const { result } = renderHook(() => useTodos(), { wrapper });

    // load ban đầu
    await act(async () => {});

    // add todo
    await act(async () => {
      await result.current.addTodo("New todo");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].id).toBe(99);
    expect(result.current.todos[0].title).toBe("New todo");
  });

  it("rollback toggle when API fails", async () => {
    vi.mocked(api.fetchTodos).mockResolvedValue([
      { id: 1, title: "Test", completed: false },
    ]);

    vi.mocked(api.toggleTodo).mockRejectedValue(new Error("toggle failed"));

    const { result } = renderHook(() => useTodos(), { wrapper });

    // load ban đầu
    await act(async () => {});

    // optimistic toggle (sẽ rollback)
    await act(async () => {
      await result.current.toggleTodo(1, false);
    });

    // vẫn là false vì rollback
    expect(result.current.todos[0].completed).toBe(false);
  });
});
