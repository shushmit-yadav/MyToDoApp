import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Todo } from "./types/todo";
import { TodoItem } from "./components/TodoItem";
import { TodoInput } from "./components/TodoInput";
import { TodoFilters } from "./components/TodoFilters";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const now = new Date().toISOString();
    setTodos([...todos, { id: Date.now(), text, done: false, createdAt: now, updatedAt: now }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done, updatedAt: new Date().toISOString() } : t));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex(t => t.id === active.id);
      const newIndex = todos.findIndex(t => t.id === over.id);
      setTodos(arrayMove(todos, oldIndex, newIndex));
    }
  };

  const visibleTodos = todos
    .filter(t => filter === "all" || (filter === "done" ? t.done : !t.done))
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold text-center">MyToDoApp</h1>
      <TodoInput onAdd={addTodo} />
      <TodoFilters
        filter={filter}
        sortBy={sortBy}
        search={search}
        setFilter={setFilter}
        setSortBy={setSortBy}
        setSearch={setSearch}
      />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={visibleTodos.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {visibleTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
