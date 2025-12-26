import React, { useState, useEffect } from "react";
import { TodoInput } from "./components/TodoInput";
import { TodoFilters } from "./components/TodoFilters";
import { TodoList } from "./components/TodoList";
import { Todo } from "./types";
import "./index.css";

const LOCAL_STORAGE_KEY = "my-todo-app.todos";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      return JSON.parse(storedTodos, (key, value) =>
        key === "createdAt" || key === "updatedAt" ? new Date(value) : value
      );
    }
    return [];
  });

  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<"created" | "updated" | "status">("created");

  
  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleDone = (id: number) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done, updatedAt: new Date() } : todo
    );
    setTodos(updated);
  };

  const reorderTodos = (newTodos: Todo[]) => setTodos(newTodos);

  return (
    <div className="App">
      <h1>My ToDo App</h1>
      <TodoInput addTodo={addTodo} />
      <TodoFilters
        filter={filter}
        setFilter={setFilter}
        searchText={searchText}
        setSearchText={setSearchText}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <TodoList
        todos={todos}
        toggleDone={toggleDone}
        reorderTodos={reorderTodos}
        filter={filter}
        searchText={searchText}
        sortBy={sortBy}
      />
    </div>
  );
};

export default App;
