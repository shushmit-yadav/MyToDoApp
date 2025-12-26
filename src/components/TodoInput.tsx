import { useState } from "react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task"
        aria-label="todo-input"
      />
      <button onClick={submit} className="bg-blue-600 text-white px-4 rounded">
        Add
      </button>
    </div>
  );
}
