import actionsTypes from "./constants";
import {
  createItem,
  fetchAllItems,
  clearAll,
  deleteItemById,
  updateNameInDb,
  updateDoneTimestamp,
  updateStatusInDb,
} from "../../services/itemClient";

import {
  showLoaderAction,
  hideLoaderAction,
  showClearButtonAction,
  hideClearButtonAction,
  showToastAction,
  toastOrientationPositiveAction,
} from "./itemsViewsActions";

const addItems = (data) => ({
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

const updateItemStatus = (itemId, checked) => ({
  type: actionsTypes.UPDATE_CHECKBOX,
  itemId: itemId,
  payload: checked,
});

const updateItemDoneAt = (itemId, doneAt) => ({
  type: actionsTypes.UPDATE_DONE_AT,
  itemId: itemId,
  payload: doneAt,
});

export const addItemAction = (input) => {
  return async (dispatch) => {
    dispatch(showLoaderAction());

    const addedItems = await createItem(input);
    dispatch(hideLoaderAction());
    dispatch(showClearButtonAction());

    dispatch(addItems(addedItems));
    dispatch(toastOrientationPositiveAction());
    dispatch(
      showToastAction(`${addedItems.length} items were added successfully`)
    );
  };
};

export const getItemsAction = () => {
  return async (dispatch) => {
    try {
      const items = await fetchAllItems();

      if (items.data.length > 0) {
        dispatch(showClearButtonAction());
      }

      dispatch(addItems(items.data));
    } catch (e) {}
  };
};

export const clearAllItemsAction = () => {
  return async (dispatch) => {
    await clearAll();
    dispatch(toastOrientationPositiveAction());
    dispatch(showToastAction("All items cleared"));
    dispatch(hideClearButtonAction());

    dispatch(clearAllItems());
  };
};

export const deleteItemAction = (itemId, itemName) => {
  return async (dispatch) => {
    await deleteItemById(itemId, itemName);
    dispatch(deleteItem(itemId));
    dispatch(toastOrientationPositiveAction());
    dispatch(showToastAction(`${itemName} deleted from list`));
  };
};

export const editItemAction = (itemId, newName) => {
  return async (dispatch) => {
    await updateNameInDb(itemId, newName);
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

export const updateCheckBoxAction = (itemId, checked) => {
  return async (dispatch) => {
    const timestampNow = new Date();
    const timestampNowHours = timestampNow.getHours();

    timestampNow.setHours(timestampNowHours + 3);

    const timestampNowToDb = timestampNow
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    await updateDoneTimestamp(itemId, timestampNowToDb);

    await updateStatusInDb(itemId, checked);

    dispatch(updateItemStatus(itemId, checked));
    dispatch(updateItemDoneAt(itemId, timestampNowToDb));
  };
};
