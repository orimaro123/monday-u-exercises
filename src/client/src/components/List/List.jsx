import React from "react";
import ItemConnector from "../Item/ItemConnector";
import useFilterByQuery from "../../hooks/useFilterByQuery";

const List = ({ items }) => {
  const filter = useFilterByQuery();

  return (
    <ul>
      {filter(items).map((item) => {
        return <ItemConnector key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default List;
