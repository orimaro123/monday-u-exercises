import React, { useEffect, useState, useCallback } from "react";
import ListControls from "./ListControls";
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

const AppContainer = ({
  showLoaderAction,
  hideLoaderAction,
  showLoader,
  showClearButtonAction,
  hideClearButtonAction,
  showClearButton,
}) => {
  const [allItems, setAllItems] = useState([]);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastContent, setToastContent] = useState("");

  const createItemHandler = async (item) => {
    showLoaderAction();

    const newItems = await createItem(item);

    setToastContent(`${newItems.length} items successfully added`);
    setToastOpen((toastOpen) => !toastOpen, [setToastOpen]);

    const items = await fetchAllItems();

    hideLoaderAction();
    setAllItems(items.data);

    showClearButtonAction();
  };

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

  const clearAllItems = async () => {
    setAllItems([]);
    setToastContent("All items successfully deleted");
    setToastOpen((toastOpen) => !toastOpen, [setToastOpen]);
    await clearAll();
    hideClearButtonAction();
  };

  useEffect(() => {
    showLoaderAction();

    const loaderTimer = () => {
      setTimeout(() => {
        hideLoaderAction();
      }, 3000);
    };
    loaderTimer();
    hideClearButtonAction();
    const fetchedItems = async () => {
      const items = await fetchAllItems();

      setAllItems(items.data);
      if (items.data.length > 0) {
        showClearButtonAction();
      }
    };
    fetchedItems();
  }, []);

  const onCloseCallback = useCallback(
    () => setToastOpen(false),
    [setToastOpen]
  );

  return (
    <div className="app-container">
      <div className="upper-div">
        <Search />
      </div>

      <div className="list-container-background">
        <div className="app-name">Ori's List</div>

        <ListControls
          showLoader={showLoader}
          createItemHandler={createItemHandler}
        />

        <div className="list-container">
          <List
            itemToEdit={itemToEdit}
            itemToDelete={itemToDelete}
            allItems={allItems}
          />
        </div>

        <div className="clear-all-button-div">
          <Button
            onClick={() => clearAllItems()}
            id="clear-all-button"
            className={`clear-all-button ${showClearButton}`}
          >
            Clear All
          </Button>
          <Toast
            open={toastOpen}
            type={Toast.types.POSITIVE}
            onClose={onCloseCallback}
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
