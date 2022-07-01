import React, { useEffect, useState, useCallback, useMemo } from "react";
import ListControls from "./ListControls";
import List from "./List";
import { Button, Toast } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";

import {
  fetchAllItems,
  createItem,
  deleteItemById,
  updateNameInDb,
  clearAll,
} from "../services/itemClient";

const AppContainer = () => {
  const [allItems, setAllItems] = useState([]);
  const [hideClass, setHideClass] = useState("hide");
  const [clearAllHideClass, setClearAllHideClass] = useState("hide");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastContent, setToastContent] = useState("");

  const [loading, setLoading] = useState(false);

  const itemToCreate = async (item) => {
    setHideClass("");
    setLoading(true);

    const newItems = await createItem(item);

    setToastContent(`${newItems.data.length} items successfully added`);
    setToastOpen((toastOpen) => !toastOpen, [setToastOpen]);

    const items = await fetchAllItems();

    setLoading(false);
    setAllItems(items.data);
    setHideClass("hide");
    setClearAllHideClass("");
  };

  const itemToDelete = async (itemId, itemName) => {
    setHideClass("");
    setLoading(true);
    await deleteItemById(itemId);
    setToastContent(`${itemName} successfully deleted`);
    setToastOpen((toastOpen) => !toastOpen, [setToastOpen]);

    const items = await fetchAllItems();
    setLoading(false);
    setAllItems(items.data);
    setHideClass("hide");

    if (items.data.length === 0) {
      setClearAllHideClass("hide");
    }
  };

  const itemToEdit = async (itemId, newName) => {
    setHideClass("");
    setLoading(true);
    let itemNewName = await updateNameInDb(itemId, newName);
    setToastContent(`${newName} successfully edited and saved`);
    setToastOpen((toastOpen) => !toastOpen, [setToastOpen]);

    const items = await fetchAllItems();
    setLoading(false);
    setAllItems(items.data);
    setHideClass("hide");

    return itemNewName;
  };

  const clearAllItems = async () => {
    setAllItems([]);
    setToastContent("All items successfully deleted");
    setToastOpen((toastOpen) => !toastOpen, [setToastOpen]);
    await clearAll();

    setClearAllHideClass("hide");
  };

  useEffect(() => {
    const fetchedItems = async () => {
      setHideClass("");
      setLoading(true);
      const items = await fetchAllItems();

      setAllItems(items.data);
      if (items.data.length > 0) {
        setClearAllHideClass("");
      }
      setLoading(false);
      setHideClass("hide");
    };
    fetchedItems();
  }, []);

  const onCloseCallback = useCallback(
    () => setToastOpen(false),
    [setToastOpen]
  );

  return (
    <div className="app-container">
      <div className="list-container-background">
        <div className="app-name">Ori's List</div>

        <ListControls
          loading={loading}
          setLoading={setLoading}
          itemToCreate={itemToCreate}
        />

        <div className="list-container">
          <List
            itemToEdit={itemToEdit}
            itemToDelete={itemToDelete}
            allItems={allItems}
          />
        </div>

        <div className={`loader-wrapper ${hideClass}`}>
          <span className="loader  ">
            <span className="loader-inner "></span>
          </span>
        </div>
        <div className="clear-all-button-div">
          <Button
            onClick={() => clearAllItems()}
            id="clear-all-button"
            className={`clear-all-button ${clearAllHideClass}`}
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
