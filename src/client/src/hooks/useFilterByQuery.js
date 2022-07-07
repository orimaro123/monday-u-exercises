import { useSelector } from "react-redux";
import { useCallback } from "react";

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
  const filter = useCallback(
    (items) => {
      const { status, name } = query ?? {};

      if (status === STATUS.ALL && name?.length === 0) {
        return items;
      }

      let filteredItems = items;

      filteredItems = filteredItems.filter(item => item.itemName.toLowerCase().includes(name?.toLowerCase() ?? ''));

      if (status === STATUS.COMPLETED) {
        return filteredItems.filter((item) => item.status);
      }

      if (status === STATUS.IN_PROGRESS) {
        return filteredItems.filter((item) => item.status === false);
      }

      return filteredItems;
    },
    [query]
  );

  return filter;
}
