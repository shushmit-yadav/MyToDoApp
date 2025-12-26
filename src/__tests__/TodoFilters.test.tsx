import { render, fireEvent, screen } from "@testing-library/react";
import { TodoFilters } from "../components/TodoFilters";

test("TodoFilters calls filter setters", () => {
  const setFilter = jest.fn();
  const setSortBy = jest.fn();
  const setSearch = jest.fn();

  render(
    <TodoFilters
      filter="all"
      sortBy="created"
      search=""
      setFilter={setFilter}
      setSortBy={setSortBy}
      setSearch={setSearch}
    />
  );

  fireEvent.change(screen.getByDisplayValue("All"), { target: { value: "done" } });
  fireEvent.change(screen.getByDisplayValue("Created"), { target: { value: "updated" } });
  fireEvent.change(screen.getByPlaceholderText("Search"), { target: { value: "abc" } });

  expect(setFilter).toHaveBeenCalledWith("done");
  expect(setSortBy).toHaveBeenCalledWith("updated");
  expect(setSearch).toHaveBeenCalledWith("abc");
});
