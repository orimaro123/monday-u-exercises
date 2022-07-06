import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const List = ({ items }) => {
  return (
    <div>
      {items.map((item) => {
        return (
          <Item
            key={item.itemId}
            item={item}
            //itemToDelete={itemToDelete}
            //itemToEdit={itemToEdit}
          />
        );
      })}
    </div>
  );
};

export default List;
