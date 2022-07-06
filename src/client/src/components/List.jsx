import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import ItemConnector from "./ItemConnector";

const List = ({ items }) => {
  return (
    <div>
      {items.map((item) => {
        return (
          <ItemConnector
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
