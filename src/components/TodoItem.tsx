import React from "react";
import { Todo } from "../types";

interface Props {
  todo: Todo;
  toggleDone: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, toggleDone }) => {
  return (
    <li className={todo.done ? "done" : ""}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleDone(todo.id)}
      />
      {todo.text}
    </li>
  );
};
