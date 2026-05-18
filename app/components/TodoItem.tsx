"use client";

import { useState } from "react";
import { Todo } from "../hooks/useTodos";
import { parseLocalDate } from "../utils/dateUtils";
import TaskDetailsModal from "./TaskDetailsModal";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onAddSubtask?: (todoId: string, text: string) => void;
  onToggleSubtask?: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask?: (todoId: string, subtaskId: string) => void;
}

function getPriorityColor(dueDate?: string): string {
  if (!dueDate) return "text-gray-400";

  const due = parseLocalDate(dueDate);
  if (!due) return "text-gray-400";

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
  const date = parseLocalDate(dateString);
  if (!date) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return date.toLocaleDateString();
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const subtaskCount = todo.subtasks?.length || 0;
  const completedSubtasks = todo.subtasks?.filter((s) => s.done).length || 0;

  return (
    <>
      <li className="flex items-start gap-3 py-2 px-4 bg-white rounded-lg shadow-sm border border-gray-100 group hover:border-gray-200 transition-colors">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.text}" as ${todo.done ? "undone" : "done"}`}
          className="w-5 h-5 cursor-pointer accent-indigo-600 mt-0.5 flex-shrink-0"
        />
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setShowDetails(true)}>
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
          {todo.description && (
            <span className="block text-xs text-gray-500 mt-1 line-clamp-1">
              {todo.description}
            </span>
          )}
          {subtaskCount > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full"
                  style={{ width: `${(completedSubtasks / subtaskCount) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">
                {completedSubtasks}/{subtaskCount}
              </span>
            </div>
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

      <TaskDetailsModal
        todo={todo}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onUpdate={onUpdate}
        onAddSubtask={onAddSubtask}
        onToggleSubtask={onToggleSubtask}
        onDeleteSubtask={onDeleteSubtask}
      />
    </>
  );
}
