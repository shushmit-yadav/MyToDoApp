import { Todo } from "../types/todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

export function TodoItem({ todo, onToggle }: TodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-between p-3 rounded border shadow-sm bg-white ${todo.done ? "opacity-60 line-through" : ""}`}
    >
      <span className="flex-1 mr-2">{todo.text}</span>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label="toggle-todo"
      />
    </div>
  );
}