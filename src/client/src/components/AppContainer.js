import React, { useEffect, useState } from "react";
import ListControls from "./ListControls";
import ListContainerBackground from "./ListContainerBackground";
import { fetchAllItems, createItem , deleteItemById ,updateNameInDb} from "../itemClient";
import ComponentItemsRender from "./ComponentItemsRender";

const AppContainer = () => {
  const [allItems, setAllItems] = useState([]);

  const itemToCreate = async (item) => {
    await createItem(item);
    const items = await fetchAllItems();
    setAllItems(items.data);
  };

  const itemToDelete = async (itemId) => {
    await deleteItemById(itemId);
    const items = await fetchAllItems();
    setAllItems(items.data);
  };

  const itemToEdit = async (itemId, newName) => {
    await updateNameInDb(itemId, newName);
    const items = await fetchAllItems();
    setAllItems(items.data);
  };

  useEffect(() => {
    const fetchedItems = async () => {
      const items = await fetchAllItems();
      setAllItems(items.data);
    };
    fetchedItems();
  }, []);

 
  return (
    <div className="appContainer">
      <div className="listContainerBackground">
        <ListControls itemToCreate={itemToCreate} />
        <div className="list-container">
        <ComponentItemsRender itemToEdit={itemToEdit} itemToDelete={itemToDelete} allItems={allItems} />
        </div>
      </div>
    </div>
  );
};
export default AppContainer;
