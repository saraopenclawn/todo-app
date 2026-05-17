# Todo List App

A simple, clean todo list application built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features

- Add tasks via input field or pressing Enter
- Mark tasks as done (with strikethrough style)
- Delete tasks
- Task counter showing remaining items

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS
- **Language:** TypeScript
- **Tests:** Jest + Testing Library

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

```bash
npm test
```

## Project Structure

```
app/
  page.tsx              # Main page
  hooks/
    useTodos.ts         # Todo state logic (add, toggle, delete)
  components/
    AddTodo.tsx         # Input form for adding tasks
    TodoItem.tsx        # Single todo row (checkbox + delete button)
__tests__/
  useTodos.test.ts      # Hook unit tests
  AddTodo.test.tsx      # AddTodo component tests
  TodoItem.test.tsx     # TodoItem component tests
```
