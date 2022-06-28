import React, { useEffect, useState } from "react";
import ListControls from "./ListControls";
import ListContainerBackground from "./ListContainerBackground";
import { fetchAllItems } from "../itemClient";
import editIcon from "../images/edit-icon.svg";
import saveIcon from "../images/save-icon.svg";
import deleteIcon from "../images/delete-icon.svg";

const ComponentItemRender = ({ item, itemToDelete, itemToEdit }) => {
  const [newName, setNewName] = useState(item.itemName);
  const [editSaveButtonIcon, setEditSaveButtonText] = useState(editIcon);

  const [readValue, setReadOnly] = useState(true);
  const editName = async (e) => {
    if (editSaveButtonIcon == editIcon) {
      setReadOnly(false);
      setEditSaveButtonText(saveIcon);
    } else {
      setReadOnly(true);
      setEditSaveButtonText(editIcon);
      await itemToEdit(item.itemId, newName);
    }
  };

  return (
    <li className="list-item flex">
      {" "}
      <div className="check-box">
      <input type="checkBox" />
      </div>
      <input className="list-item-text"
        onChange={(e) => setNewName(e.target.value)}
        type="text"
        readOnly={readValue}
        value={newName}
      />
      {item.isPokemon ? (
       <div className="pokemon-photo-div"> <img  src={item.pokemonData}></img></div>
      ) : (
        <div className="space-div"></div>
      )}
      <div className="list-item-trash-div">
      <img src={deleteIcon} onClick={() => itemToDelete(item.itemId)} />
      </div>
      <div className="list-item-edit-div">
      <img
        className="listItemEditButton"
        src={editSaveButtonIcon}
        onClick={() => editName()}
      />
      </div>
    </li>
  );
};
export default ComponentItemRender;
