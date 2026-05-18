"use client";

import { Todo } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  const weekStart = new Date(d.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

function formatWeekRange(date: Date): string {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const startStr = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const endStr = end.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return `${startStr} - ${endStr}`;
}

export default function WeeklyView({ todos, onToggle, onDelete }: Props) {
  const groupedByWeek = new Map<string, Todo[]>();

  todos.forEach((todo) => {
    const date = todo.dueDate ? new Date(todo.dueDate) : new Date();
    const weekStart = getWeekStart(date);
    const weekKey = weekStart.toISOString();

    if (!groupedByWeek.has(weekKey)) {
      groupedByWeek.set(weekKey, []);
    }
    groupedByWeek.get(weekKey)!.push(todo);
  });

  const sortedWeeks = Array.from(groupedByWeek.entries())
    .sort(([keyA], [keyB]) => new Date(keyA).getTime() - new Date(keyB).getTime());

  return (
    <div className="space-y-6">
      {sortedWeeks.map(([weekKey, weekTodos]) => {
        const weekDate = new Date(weekKey);
        const sortedTodos = [...weekTodos].sort((a, b) => {
          if (a.done !== b.done) return a.done ? 1 : -1;

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const getPriority = (dueDate?: string) => {
            if (!dueDate) return 999;
            const due = new Date(dueDate);
            const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            return diffDays;
          };

          const aPriority = getPriority(a.dueDate);
          const bPriority = getPriority(b.dueDate);

          return aPriority - bPriority;
        });

        return (
          <div key={weekKey}>
            <h2 className="text-sm font-semibold text-gray-700 mb-3 px-4">
              {formatWeekRange(weekDate)}
            </h2>
            <ul className="flex flex-col gap-2">
              {sortedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
