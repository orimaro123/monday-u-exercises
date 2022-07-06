import React, { useEffect, useState, useCallback } from "react";
import ListControls from "./ListControls";
import ListControlsConnector from "./ListControlsConnector";
import List from "./List";
import { Button, Toast } from "monday-ui-react-core";

import {
  fetchAllItems,
  createItem,
  deleteItemById,
  updateNameInDb,
  clearAll,
} from "../services/itemClient";
import Search from "./Search";
import ListConnector from "./ListConnector";

const AppContainer = ({
  showLoaderAction,
  hideLoaderAction,
  showLoader,
  showClearButtonAction,
  hideClearButtonAction,
  showClearButton,
  showToastAction,
  hideToastAction,
  showToastValue,
  crateItemAction,
  getItemsAction,
  clearAllItemsAction,
}) => {
  const [allItems, setAllItems] = useState([]);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastContent, setToastContent] = useState("");

  const itemToDelete = async (itemId, itemName) => {
    showLoaderAction();

    await deleteItemById(itemId);
    setToastContent(`${itemName} successfully deleted`);
    setToastOpen((toastOpen) => !toastOpen, [setToastOpen]);

    const items = await fetchAllItems();

    hideLoaderAction();
    setAllItems(items.data);

    if (items.data.length === 0) {
      hideClearButtonAction();
    }
  };

  const itemToEdit = async (itemId, newName) => {
    showLoaderAction();

    let itemNewName = await updateNameInDb(itemId, newName);
    setToastContent(`${newName} successfully edited and saved`);
    setToastOpen((toastOpen) => !toastOpen, [setToastOpen]);

    const items = await fetchAllItems();
    hideLoaderAction();

    setAllItems(items.data);

    return itemNewName;
  };

  const clearAllItems = useCallback(async () => {
    showToastAction();

    setAllItems([]);
    setToastContent("All items successfully deleted");
    setToastOpen((toastOpen) => !toastOpen, [setToastOpen]);
    await clearAll();
    hideClearButtonAction();
  }, [
    setAllItems,
    setToastContent,
    setToastOpen,
    hideClearButtonAction,
    showToastAction,
  ]);

  useEffect(() => {
    getItemsAction();
  }, [getItemsAction]);

  const onCloseCallback = useCallback(() => {
    hideToastAction();
  }, [hideToastAction]);

  return (
    <div className="app-container">
      <div className="upper-div">
        <Search />
      </div>

      <div className="list-container-background">
        <div className="app-name">Ori's List</div>

        <ListControlsConnector
        /*  showLoader={showLoader} */
        />

        <div className="list-container">
          <ListConnector
          //itemToEdit={itemToEdit}
          //itemToDelete={itemToDelete}
          // allItems={allItems}
          />
        </div>

        <div className="clear-all-button-div">
          {showClearButton ? (
            <Button
              onClick={clearAllItemsAction}
              id="clear-all-button"
              className={`clear-all-button `} //{showClearButton}
            >
              Clear All
            </Button>
          ) : null}
          <Toast
            open={showToastValue} //todo toastOpen
            type={Toast.types.POSITIVE}
            onClose={() => onCloseCallback()}
            autoHideDuration={4000}
            className="monday-storybook-toast_box"
          >
            {toastContent}
          </Toast>
        </div>
      </div>
    </div>
  );
};
export default AppContainer;
