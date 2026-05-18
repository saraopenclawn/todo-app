"use client";

import { useState, FormEvent } from "react";

interface Props {
  onAdd: (text: string, dueDate?: string, description?: string) => void;
}

export default function AddTodo({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value, dueDate || undefined, description || undefined);
    setValue("");
    setDueDate("");
    setDescription("");
    setShowDate(false);
    setShowDescription(false);
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

      {showDescription && (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task..."
          className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          rows={3}
          autoFocus
        />
      )}

      <div className="flex gap-3 text-xs">
        <button
          type="button"
          onClick={() => setShowDate(!showDate)}
          className="text-gray-500 hover:text-indigo-600 transition-colors"
        >
          {showDate ? "Hide due date" : "+ Add due date"}
        </button>
        <button
          type="button"
          onClick={() => setShowDescription(!showDescription)}
          className="text-gray-500 hover:text-indigo-600 transition-colors"
        >
          {showDescription ? "Hide details" : "+ Add details"}
        </button>
      </div>
    </form>
  );
}
