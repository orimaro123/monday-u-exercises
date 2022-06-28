import React, { useEffect, useState } from "react";
import ListControls from "./ListControls";
import ListContainerBackground from "./ListContainerBackground";
import { fetchAllItems } from "../itemClient";
import ComponentItemRender from "./ComponentItemRender";

const ComponentItemsRender = ({ allItems , itemToDelete , itemToEdit}) => {
  
  return (
		<div>
			{allItems.map((item) => {
				return (
					<ComponentItemRender
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
export default ComponentItemsRender;
