"use client";

import { useState, useCallback } from "react";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text: trimmed, done: false, createdAt: Date.now() },
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo };
}
