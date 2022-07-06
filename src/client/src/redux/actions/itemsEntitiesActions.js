import actionsTypes from "./constants";
import {
  createItem,
  fetchAllItems,
  clearAll,
  deleteItemById,
} from "../../services/itemClient";

import {
  showLoaderAction,
  hideLoaderAction,
  showClearButtonAction,
  hideClearButtonAction,
  showToastAction,
} from "./itemsViewsActions";

import { getItems } from "../selectors/itemsEntitiesSelectors";

const increment = () => ({
  type: actionsTypes.INCREMENT,
});

const addItem = (data) => ({
  type: actionsTypes.ADD_ITEMS,
  data: data,
});

const clearAllItems = () => ({
  type: actionsTypes.CLEAR_ALL_ITEMS,
});

const deleteItem = (itemId) => ({
  type: actionsTypes.DELETE_ITEM,
  payload: itemId,
});

export const addItemAction = (input) => {
  return async (dispatch) => {
    dispatch(showLoaderAction());

    const addedItems = await createItem(input);
    dispatch(hideLoaderAction());
    dispatch(showClearButtonAction());

    dispatch(addItem(addedItems));
    dispatch(
      showToastAction(`${addedItems.length} items were added successfully`)
    );
  };
};

export const getItemsAction = () => {
  return async (dispatch) => {
    const items = await fetchAllItems();

    if (items.data.length > 0) {
      dispatch(showClearButtonAction());
    }

    dispatch(addItem(items.data));
  };
};

export const clearAllItemsAction = () => {
  return async (dispatch) => {
    const clearAllItemsRes = await clearAll();
    dispatch(showToastAction("All items cleared"));
    dispatch(hideClearButtonAction());

    dispatch(clearAllItems());
  };
};

export const deleteItemAction = (itemId, itemName) => {
  return async (dispatch) => {
    const deleteItemRes = await deleteItemById(itemId, itemName);
    dispatch(deleteItem(itemId));

    dispatch(showToastAction(`${itemName} deleted from list`));
  };
};
