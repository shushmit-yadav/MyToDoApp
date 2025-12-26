interface TodoFiltersProps {
  filter: string;
  sortBy: string;
  search: string;
  setFilter: (v: string) => void;
  setSortBy: (v: string) => void;
  setSearch: (v: string) => void;
}

export function TodoFilters({ filter, sortBy, search, setFilter, setSortBy, setSearch }: TodoFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="pending">Pending</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="created">Created</option>
        <option value="updated">Updated</option>
        <option value="status">Status</option>
      </select>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
}
