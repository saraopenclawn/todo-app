import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "../app/components/TodoItem";
import { Todo } from "../app/hooks/useTodos";

const todo: Todo = {
  id: "1",
  text: "Buy milk",
  done: false,
  createdAt: 0,
};

describe("TodoItem", () => {
  it("renders todo text", () => {
    render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox clicked", async () => {
    const onToggle = jest.fn();
    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={() => {}} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button clicked", async () => {
    const onDelete = jest.fn();
    render(<TodoItem todo={todo} onToggle={() => {}} onDelete={onDelete} />);
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("shows strikethrough style when done", () => {
    const doneTodo = { ...todo, done: true };
    render(<TodoItem todo={doneTodo} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("Buy milk")).toHaveClass("line-through");
  });

  it("checkbox is checked when todo is done", () => {
    const doneTodo = { ...todo, done: true };
    render(<TodoItem todo={doneTodo} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
