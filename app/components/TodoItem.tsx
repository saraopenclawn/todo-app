"use client";

import { Todo } from "../hooks/useTodos";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 py-3 px-4 bg-white rounded-lg shadow-sm border border-gray-100 group">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.done ? "undone" : "done"}`}
        className="w-5 h-5 cursor-pointer accent-indigo-600"
      />
      <span
        className={`flex-1 text-sm ${
          todo.done ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
        className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 text-lg leading-none"
      >
        ×
      </button>
    </li>
  );
}
