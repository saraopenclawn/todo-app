"use client";

import { useState, FormEvent } from "react";

interface Props {
  onAdd: (text: string, dueDate?: string) => void;
}

export default function AddTodo({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showDate, setShowDate] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value, dueDate || undefined);
    setValue("");
    setDueDate("");
    setShowDate(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a new task..."
          aria-label="New task"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>

      {showDate && (
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          autoFocus
        />
      )}

      <button
        type="button"
        onClick={() => setShowDate(!showDate)}
        className="text-xs text-gray-500 hover:text-indigo-600 transition-colors"
      >
        {showDate ? "Hide due date" : "+ Add due date (optional)"}
      </button>
    </form>
  );
}
