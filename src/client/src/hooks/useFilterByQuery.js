import { useSelector } from "react-redux";
import { useCallback } from "react";
import { getQuery } from "../redux/selectors/itemsEntitiesSelectors";

export const STATUS = {
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  ALL: "ALL",
};

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

      filteredItems = filteredItems.filter((item) =>
        item.itemName.toLowerCase().includes(name?.toLowerCase() ?? "")
      );

      if (status === STATUS.COMPLETED) {
        return filteredItems.filter((item) => item.status);
      }

      if (status === STATUS.IN_PROGRESS) {
        return filteredItems.filter((item) => item.status === false);
      }

      if (status === STATUS.ALL) {
        return filteredItems
      }

      return filteredItems;
    },
    [query]
  );

  return filter;
}
