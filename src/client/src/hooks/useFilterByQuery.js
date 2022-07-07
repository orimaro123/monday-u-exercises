import { useSelector } from "react-redux";

export const STATUS = {
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  ALL: "ALL",
};

// todo: move this to selectors
const getQuery = (state) => state.itemsEntities.query;

/**
 * Custom hook
 * @returns {(items: [] => [])} filter function that filters the items by user's query
 */
export default function useFilterByQuery() {
  const query = useSelector(getQuery);
  const filter = (items) => {
    if (query === STATUS.COMPLETED) {
      return items.filter((item) => item.status);
    }

    if (query === STATUS.IN_PROGRESS) {
      return items.filter((item) => item.status === false);
    }

    return items;
  };

  return filter;
}
