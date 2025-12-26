import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from "react-beautiful-dnd";
import { Todo } from "../types";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  toggleDone: (id: number) => void;
  reorderTodos: (todos: Todo[]) => void;
  filter: "all" | "done" | "pending";
  searchText: string;
  sortBy: "created" | "updated" | "status";
}

export const TodoList: React.FC<Props> = ({
  todos,
  toggleDone,
  reorderTodos,
  filter,
  searchText,
  sortBy,
}) => {
  // Filter
  const filtered = todos
    .filter(todo => (filter === "done" ? todo.done : filter === "pending" ? !todo.done : true))
    .filter(todo => todo.text.toLowerCase().includes(searchText.toLowerCase()));

  // Sort
  const sorted = filtered.sort((a, b) => {
    if (sortBy === "created") return b.createdAt.getTime() - a.createdAt.getTime();
    if (sortBy === "updated") return b.updatedAt.getTime() - a.updatedAt.getTime();
    if (sortBy === "status") return Number(a.done) - Number(b.done);
    return 0;
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sorted);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    reorderTodos(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided: DroppableProvided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {sorted.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                {(provided: DraggableProvided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem todo={todo} toggleDone={toggleDone} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
