"use client";

import { useState, useCallback, useEffect } from "react";

export interface Subtask {
  id: string;
  text: string;
  done: boolean;
}

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  dueDate?: string;
  description?: string;
  subtasks?: Subtask[];
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

  const addTodo = useCallback((text: string, dueDate?: string, description?: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text: trimmed, done: false, createdAt: Date.now(), dueDate, description },
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

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const addSubtask = useCallback((todoId: string, text: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? {
              ...t,
              subtasks: [
                ...(t.subtasks || []),
                { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, done: false },
              ],
            }
          : t
      )
    );
  }, []);

  const toggleSubtask = useCallback((todoId: string, subtaskId: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? {
              ...t,
              subtasks: t.subtasks?.map((s) => (s.id === subtaskId ? { ...s, done: !s.done } : s)),
            }
          : t
      )
    );
  }, []);

  const deleteSubtask = useCallback((todoId: string, subtaskId: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? {
              ...t,
              subtasks: t.subtasks?.filter((s) => s.id !== subtaskId),
            }
          : t
      )
    );
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo, addSubtask, toggleSubtask, deleteSubtask };
}
