import React from "react";

interface Props {
  filter: "all" | "done" | "pending";
  setFilter: (value: "all" | "done" | "pending") => void;
  searchText: string;
  setSearchText: (text: string) => void;
  sortBy: "created" | "updated" | "status";
  setSortBy: (value: "created" | "updated" | "status") => void;
}

export const TodoFilters: React.FC<Props> = ({
  filter,
  setFilter,
  searchText,
  setSearchText,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="filters">
      <button onClick={() => setFilter("all")} disabled={filter === "all"}>All</button>
      <button onClick={() => setFilter("done")} disabled={filter === "done"}>Done</button>
      <button onClick={() => setFilter("pending")} disabled={filter === "pending"}>Pending</button>

      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
        <option value="created">Created Date</option>
        <option value="updated">Last Updated</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
};
