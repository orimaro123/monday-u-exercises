import React from "react";
import ItemConnector from "../Item/ItemConnector";
import useFilterByQuery from "../../hooks/useFilterByQuery";

const List = ({ items }) => {
  const filter = useFilterByQuery();

  return (
    <div className="list">
      {filter(items).map((item) => {
        return <ItemConnector key={item.itemId} item={item} />;
      })}
    </div>
  );
};

export default List;
