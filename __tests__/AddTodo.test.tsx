import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTodo from "../app/components/AddTodo";

describe("AddTodo", () => {
  it("renders the input and button", () => {
    render(<AddTodo onAdd={() => {}} />);
    expect(screen.getByPlaceholderText("Add a new task...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("button is disabled when input is empty", () => {
    render(<AddTodo onAdd={() => {}} />);
    expect(screen.getByRole("button", { name: /add/i })).toBeDisabled();
  });

  it("calls onAdd with typed text and clears input", async () => {
    const onAdd = jest.fn();
    render(<AddTodo onAdd={onAdd} />);
    const input = screen.getByPlaceholderText("Add a new task...");
    await userEvent.type(input, "Buy milk");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(onAdd).toHaveBeenCalledWith("Buy milk");
    expect(input).toHaveValue("");
  });

  it("submits on Enter key", async () => {
    const onAdd = jest.fn();
    render(<AddTodo onAdd={onAdd} />);
    const input = screen.getByPlaceholderText("Add a new task...");
    await userEvent.type(input, "Buy milk{Enter}");
    expect(onAdd).toHaveBeenCalledWith("Buy milk");
  });

  it("does not call onAdd for whitespace-only input", async () => {
    const onAdd = jest.fn();
    render(<AddTodo onAdd={onAdd} />);
    const input = screen.getByPlaceholderText("Add a new task...");
    await userEvent.type(input, "   {Enter}");
    expect(onAdd).not.toHaveBeenCalled();
  });
});
