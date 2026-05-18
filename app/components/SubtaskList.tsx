"use client";

import { useState } from "react";
import { Subtask } from "../hooks/useTodos";

interface Props {
  subtasks?: Subtask[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SubtaskList({ subtasks = [], onAdd, onToggle, onDelete }: Props) {
  const [newSubtaskText, setNewSubtaskText] = useState("");
  const completedCount = subtasks.filter((s) => s.done).length;
  const totalCount = subtasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  function handleAdd() {
    if (!newSubtaskText.trim()) return;
    onAdd(newSubtaskText);
    setNewSubtaskText("");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">Subtasks</h4>
        {totalCount > 0 && (
          <span className="text-xs text-gray-500">
            {completedCount}/{totalCount}
          </span>
        )}
      </div>

      {totalCount > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <ul className="space-y-2">
        {subtasks.map((subtask) => (
          <li key={subtask.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <input
              type="checkbox"
              checked={subtask.done}
              onChange={() => onToggle(subtask.id)}
              className="w-4 h-4 cursor-pointer accent-indigo-600 flex-shrink-0"
            />
            <span
              className={`flex-1 text-sm ${
                subtask.done ? "line-through text-gray-400" : "text-gray-900"
              }`}
            >
              {subtask.text}
            </span>
            <button
              onClick={() => onDelete(subtask.id)}
              className="text-gray-400 hover:text-red-500 transition-colors text-sm flex-shrink-0"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 pt-2">
        <input
          type="text"
          value={newSubtaskText}
          onChange={(e) => setNewSubtaskText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a subtask..."
          className="flex-1 px-3 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleAdd}
          disabled={!newSubtaskText.trim()}
          className="px-3 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}
