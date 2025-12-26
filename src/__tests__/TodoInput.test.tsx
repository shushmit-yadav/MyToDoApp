import { render, fireEvent, screen } from "@testing-library/react";
import { TodoInput } from "../components/TodoInput";

test("TodoInput submits entered text", () => {
  const add = jest.fn();
  render(<TodoInput onAdd={add} />);

  fireEvent.change(screen.getByLabelText("todo-input"), {
    target: { value: "New Task" },
  });

  fireEvent.click(screen.getByText("Add"));
  expect(add).toHaveBeenCalledWith("New Task");
});

test("TodoInput does not submit empty text", () => {
  const add = jest.fn();
  render(<TodoInput onAdd={add} />);
  fireEvent.click(screen.getByText("Add"));
  expect(add).not.toHaveBeenCalled();
});
