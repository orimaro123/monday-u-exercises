import React, { useEffect, useState } from "react";
import ListControls from "./ListControls";
import List from "./List";

import {
  fetchAllItems,
  createItem,
  deleteItemById,
  updateNameInDb,
  clearAll,
} from "../itemClient";
import ComponentItemsRender from "./List";

const AppContainer = () => {
  const [allItems, setAllItems] = useState([]);
  const [hideClass, setHideClass] = useState("hide");
  const [clearAllHideClass, setClearAllHideClass] = useState("hide");

  const itemToCreate = async (item) => {
    setHideClass("");
    await createItem(item);
    const items = await fetchAllItems();
    setAllItems(items.data);
    setHideClass("hide");
    setClearAllHideClass("");
  };

  const itemToDelete = async (itemId) => {
    setHideClass("");
    await deleteItemById(itemId);
    const items = await fetchAllItems();
    setAllItems(items.data);
    setHideClass("hide");

    if (items.data.length === 0) {
      setClearAllHideClass("hide");
    }
  };

  const itemToEdit = async (itemId, newName) => {
    setHideClass("");
   let itemNewName = await updateNameInDb(itemId, newName);
  
    const items = await fetchAllItems();
    setAllItems(items.data);
    setHideClass("hide");
   
 
  return itemNewName
   
  };

  const clearAllItems = async () => {
    setAllItems([]);
    await clearAll();
    setClearAllHideClass("hide");
  };

  useEffect(() => {
    const fetchedItems = async () => {
      setHideClass("");
      const items = await fetchAllItems();

      setAllItems(items.data);
      if(items.data.length > 0){
    setClearAllHideClass("");

      }

      setHideClass("hide");
    };
    fetchedItems();
  }, []);

  return (
    <div className="app-container">
      <div className="list-container-background">
        <div className="app-name">Ori's Todo List</div>

        <ListControls itemToCreate={itemToCreate} />
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
          <button
            onClick={() => clearAllItems()}
            className={`clear-all-button ${clearAllHideClass}`}
          >
            ClearAll
          </button>
        </div>
      </div>
    </div>
  );
};
export default AppContainer;
