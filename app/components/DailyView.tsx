"use client";

import { Todo } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import { parseLocalDate } from "../utils/dateUtils";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

export default function DailyView({ todos, onToggle, onDelete, onUpdate }: Props) {
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getPriority = (dueDate?: string) => {
      if (!dueDate) return 999;
      const due = parseLocalDate(dueDate);
      if (!due) return 999;
      const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    const aPriority = getPriority(a.dueDate);
    const bPriority = getPriority(b.dueDate);

    return aPriority - bPriority;
  });

  return (
    <ul className="flex flex-col gap-2">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
