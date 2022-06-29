import React, { useEffect, useState } from "react";
import ListControls from "./ListControls";

import { fetchAllItems } from "../itemClient";
import Item from "./Item";

const List = ({ allItems , itemToDelete , itemToEdit}) => {
  
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
