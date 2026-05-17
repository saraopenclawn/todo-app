"use client";

import { useState, useCallback, useEffect } from "react";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  dueDate?: string;
}

const STORAGE_KEY = "todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTodos(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isHydrated]);

  const addTodo = useCallback((text: string, dueDate?: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text: trimmed, done: false, createdAt: Date.now(), dueDate },
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
