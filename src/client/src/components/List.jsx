import React from "react";

import Item from "./Item"

const List = ({ allItems, itemToDelete, itemToEdit }) => {
  return (
    <div>
      {allItems.map((item) => {
        return (
          <Item
            key={item.itemId}
            item={item}
            itemToDelete={itemToDelete}
            itemToEdit={itemToEdit}
          />
        );
      })}
    </div>
  );
};
export default List;
