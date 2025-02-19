import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import ItemConnector from "./ItemConnector";
import useFilterByQuery from "../hooks/useFilterByQuery"; 

const List = ({ items }) => {
  const filter = useFilterByQuery();
  
  return (
    <div>
      {filter(items).map((item) => {
        return <ItemConnector key={item.itemId} item={item} />;
      })}
    </div>
  );
};

export default List;
