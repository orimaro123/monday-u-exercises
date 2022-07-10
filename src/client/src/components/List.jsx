import React from "react";
import PropTypes from "prop-types";
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


 List.propTypes = {
	itemToDelete: PropTypes.func.isRequired,
	itemToEdit: PropTypes.func.isRequired,
	allItems: PropTypes.array.isRequired,

  }; 
export default List;
