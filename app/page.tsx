"use client";

import { useTodos } from "./hooks/useTodos";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md">
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

        {todos.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-12">
            No tasks yet. Add one above!
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
