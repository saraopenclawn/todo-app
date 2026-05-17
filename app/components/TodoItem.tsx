"use client";

import { Todo } from "../hooks/useTodos";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function getPriorityColor(dueDate?: string): string {
  if (!dueDate) return "text-gray-400";

  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "text-red-600 font-semibold"; // overdue
  if (diffDays === 0) return "text-orange-600 font-semibold"; // today
  if (diffDays === 1) return "text-orange-500"; // tomorrow
  return "text-gray-400"; // future
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return date.toLocaleDateString();
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-start gap-3 py-2 px-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:border-gray-200 transition-colors">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.done ? "undone" : "done"}`}
        className="w-5 h-5 cursor-pointer accent-indigo-600 mt-0.5 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <span
          className={`block text-sm leading-snug ${
            todo.done ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
        {todo.dueDate && (
          <span className={`block text-xs mt-1 ${getPriorityColor(todo.dueDate)}`}>
            {formatDate(todo.dueDate)}
          </span>
        )}
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
        className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none flex-shrink-0 mt-0.5"
      >
        ×
      </button>
    </li>
  );
}
