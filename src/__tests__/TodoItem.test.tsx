import { render, fireEvent, screen } from "@testing-library/react";
import { TodoItem } from "../components/TodoItem";
import { Todo } from "../types/todo";

const mockTodo: Todo = {
  id: 1,
  text: "Test Todo",
  done: false,
  createdAt: "",
  updatedAt: "",
};

test("TodoItem renders text", () => {
  render(<TodoItem todo={mockTodo} onToggle={jest.fn()} />);
  expect(screen.getByText("Test Todo")).toBeInTheDocument();
});

test("TodoItem toggles checkbox", () => {
  const toggle = jest.fn();
  render(<TodoItem todo={mockTodo} onToggle={toggle} />);
  fireEvent.click(screen.getByLabelText("toggle-todo"));
  expect(toggle).toHaveBeenCalledWith(1);
});
