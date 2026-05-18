"use client";

import { useState, useEffect } from "react";
import { useTodos } from "./hooks/useTodos";
import AddTodo from "./components/AddTodo";
import DailyView from "./components/DailyView";
import WeeklyView from "./components/WeeklyView";
import MonthlyView from "./components/MonthlyView";

type ViewMode = "daily" | "weekly" | "monthly";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isHydrated, setIsHydrated] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("daily");

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const remaining = todos.filter((t) => !t.done).length;

  if (!isHydrated) return null;

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
          {todos.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {remaining === 0
                ? "All tasks done!"
                : `${remaining} task${remaining !== 1 ? "s" : ""} remaining`}
            </p>
          )}
        </div>

        <AddTodo onAdd={addTodo} />

        <div className="flex gap-2 mt-6 mb-6">
          <button
            onClick={() => setViewMode("daily")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === "daily"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setViewMode("weekly")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === "weekly"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === "monthly"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
            }`}
          >
            Monthly
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-12">
            No tasks yet. Add one above!
          </p>
        ) : viewMode === "daily" ? (
          <DailyView todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
        ) : viewMode === "weekly" ? (
          <WeeklyView todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
        ) : (
          <MonthlyView todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
        )}
      </div>
    </main>
  );
}
