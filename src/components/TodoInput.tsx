import React, { useState } from "react";

interface Props {
  addTodo: (text: string) => void;
}

export const TodoInput: React.FC<Props> = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    addTodo(input);
    setInput("");
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        value={input}
        placeholder="Add new todo..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};
