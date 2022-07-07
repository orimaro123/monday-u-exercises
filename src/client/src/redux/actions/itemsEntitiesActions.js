import actionsTypes from "./constants";
import {
  createItem,
  fetchAllItems,
  clearAll,
  deleteItemById,
  updateNameInDb,
} from "../../services/itemClient";

import {
  showLoaderAction,
  hideLoaderAction,
  showClearButtonAction,
  hideClearButtonAction,
  showToastAction,
  toastOrientationPositiveAction,
  toastOrientationNegativeAction,
} from "./itemsViewsActions";

import { getItems } from "../selectors/itemsEntitiesSelectors";
import { getToastOrientation } from "../selectors/itemsViewSelectors";
import ACTIONS from "./constants";

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

const editItem = (itemId, newName) => ({
  type: actionsTypes.EDIT_ITEM,
  itemId: itemId,
  payload: newName,
});

export const addItemAction = (input) => {
  return async (dispatch) => {
    dispatch(showLoaderAction());

    const addedItems = await createItem(input);
    dispatch(hideLoaderAction());
    dispatch(showClearButtonAction());

    dispatch(addItem(addedItems));
    dispatch(toastOrientationPositiveAction());
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
    dispatch(toastOrientationPositiveAction());
    dispatch(showToastAction("All items cleared"));
    dispatch(hideClearButtonAction());

    dispatch(clearAllItems());
  };
};

export const deleteItemAction = (itemId, itemName) => {
  return async (dispatch) => {
    const deleteItemRes = await deleteItemById(itemId, itemName);
    dispatch(deleteItem(itemId));
    dispatch(toastOrientationPositiveAction());
    dispatch(showToastAction(`${itemName} deleted from list`));
  };
};

export const editItemAction = (itemId, newName) => {
  return async (dispatch) => {
    const itemNewName = await updateNameInDb(itemId, newName);
    dispatch(editItem(itemId, newName));
    dispatch(toastOrientationPositiveAction());
    dispatch(showToastAction(`${newName} was edited`));
  };
};

export const updateQueryStatus = (status) => {
  return {
    type: actionsTypes.UPDATE_QUERY_STATUS,
    payload: status,
  };
};

export const updateQueryName = (name) => {
  return {
    type: actionsTypes.UPDATE_QUERY_NAME,
    payload: name,
  };
};
