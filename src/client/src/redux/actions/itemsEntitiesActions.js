import actionsTypes from "./constants";
import { createItem, fetchAllItems, clearAll } from "../../services/itemClient";

import {
  showLoaderAction,
  hideLoaderAction,
  showClearButtonAction,
  hideClearButtonAction,
  showToastAction,
} from "./itemsViewsActions";

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

export const addItemAction = (input) => {
  return async (dispatch) => {
    dispatch(showLoaderAction());

    const data = await createItem(input);
    dispatch(hideLoaderAction());
    dispatch(showClearButtonAction());

    dispatch(addItem(data));
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
    dispatch(showToastAction("All items cleared"))
    dispatch(hideClearButtonAction());

  
    dispatch(clearAllItems());
  };
};
