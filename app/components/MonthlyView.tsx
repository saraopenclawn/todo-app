"use client";

import { useState } from "react";
import { Todo } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import { parseLocalDate, getLocalDateString } from "../utils/dateUtils";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MonthlyView({ todos, onToggle, onDelete }: Props) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const groupedByDate = new Map<string, Todo[]>();
  todos.forEach((todo) => {
    const date = todo.dueDate ? parseLocalDate(todo.dueDate) : new Date();
    if (!date) return;
    const dateKey = getLocalDateString(date);
    if (!groupedByDate.has(dateKey)) {
      groupedByDate.set(dateKey, []);
    }
    groupedByDate.get(dateKey)!.push(todo);
  });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const todosForSelectedDate = selectedDate ? groupedByDate.get(selectedDate) || [] : [];
  const sortedTodosForDate = [...todosForSelectedDate].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    const aPriority = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const bPriority = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
    return aPriority - bPriority;
  });

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{monthName}</h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                ← Prev
              </button>
              <button
                onClick={nextMonth}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {days.map((day) => {
              const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dateStr = getLocalDateString(dayDate);
              const hasTodos = groupedByDate.has(dateStr) && groupedByDate.get(dateStr)!.length > 0;
              const isSelected = selectedDate === dateStr;
              const isToday =
                day === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                  className={`aspect-square text-sm font-medium rounded transition-colors relative ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : isToday
                        ? "bg-indigo-100 text-indigo-900 border-2 border-indigo-300"
                        : hasTodos
                          ? "bg-gray-100 text-gray-900 border-2 border-gray-300"
                          : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {day}
                  {hasTodos && !isSelected && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">
              {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </h3>
            {sortedTodosForDate.length === 0 ? (
              <p className="text-sm text-gray-400">No tasks this day</p>
            ) : (
              <ul className="space-y-2">
                {sortedTodosForDate.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
