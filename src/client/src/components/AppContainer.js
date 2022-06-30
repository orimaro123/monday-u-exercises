import React, { useEffect, useState, useCallback } from "react";
import ListControls from "./ListControls";
import List from "./List";
import { Button } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";

import {
  fetchAllItems,
  createItem,
  deleteItemById,
  updateNameInDb,
  clearAll,
} from "../itemClient";

const AppContainer = () => {
  const [allItems, setAllItems] = useState([]);
  const [hideClass, setHideClass] = useState("hide");
  const [clearAllHideClass, setClearAllHideClass] = useState("hide");

  const [loading, setLoading] = useState(false);
  const onClick = useCallback(() => {
    setLoading(true);
  }, [setLoading]);

  const itemToCreate = async (item) => {
    setHideClass("");
    setLoading(true);
    await createItem(item);
    const items = await fetchAllItems();
    setLoading(false);
    setAllItems(items.data);
    setHideClass("hide");
    setClearAllHideClass("");
  };

  const itemToDelete = async (itemId) => {
    setHideClass("");
    setLoading(true);
    await deleteItemById(itemId);
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

    const items = await fetchAllItems();
    setLoading(false);
    setAllItems(items.data);
    setHideClass("hide");

    return itemNewName;
  };

  const clearAllItems = async () => {
    setAllItems([]);
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

  return (
    <div className="app-container">
      <div className="list-container-background">
        <div className="app-name">Ori's List</div>

        <ListControls
          loading={loading}
          setLoading={setLoading}
          onClick={onClick}
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
            id="clear-all-button"className={`clear-all-button ${clearAllHideClass}`}
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AppContainer;
