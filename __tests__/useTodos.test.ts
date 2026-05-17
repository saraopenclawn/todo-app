import { renderHook, act } from "@testing-library/react";
import { useTodos } from "../app/hooks/useTodos";

describe("useTodos", () => {
  it("starts with an empty list", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toHaveLength(0);
  });

  it("adds a todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("Buy milk"));
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe("Buy milk");
    expect(result.current.todos[0].done).toBe(false);
  });

  it("ignores blank text", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("   "));
    expect(result.current.todos).toHaveLength(0);
  });

  it("trims whitespace from todo text", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("  Buy milk  "));
    expect(result.current.todos[0].text).toBe("Buy milk");
  });

  it("toggles a todo to done", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("Buy milk"));
    const id = result.current.todos[0].id;
    act(() => result.current.toggleTodo(id));
    expect(result.current.todos[0].done).toBe(true);
  });

  it("toggles a todo back to undone", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("Buy milk"));
    const id = result.current.todos[0].id;
    act(() => result.current.toggleTodo(id));
    act(() => result.current.toggleTodo(id));
    expect(result.current.todos[0].done).toBe(false);
  });

  it("deletes a todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("Buy milk"));
    const id = result.current.todos[0].id;
    act(() => result.current.deleteTodo(id));
    expect(result.current.todos).toHaveLength(0);
  });

  it("deletes only the specified todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("Task A"));
    act(() => result.current.addTodo("Task B"));
    const idA = result.current.todos[0].id;
    act(() => result.current.deleteTodo(idA));
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe("Task B");
  });
});
