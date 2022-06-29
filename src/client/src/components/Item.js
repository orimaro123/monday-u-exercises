import React, { useEffect, useState } from "react";
import ListControls from "./ListControls";

import { fetchAllItems, updateDoneTimestamp } from "../itemClient";
import editIcon from "../images/edit-icon.svg";
import saveIcon from "../images/save-icon.svg";
import deleteIcon from "../images/delete-icon.svg";

const ListItem = ({ item, itemToDelete, itemToEdit }) => {
  const [newName, setNewName] = useState(item.itemName);
  const [editSaveButtonIcon, setEditSaveButtonText] = useState(editIcon);
  const [itemWasEdited, setItemWasEdited] = useState(false);
  const [statusCompleteTime, setStatusCompleteTime] = useState("");
  const [hideClass, setHideClass] = useState("");
  const [readOnly, setReadOnly] = useState(true);
  const [decorateClass, setDecorateClass] = useState("");

  const newStatusHandler = async (e) => {
    if (e.target.checked === true) {
      setDecorateClass("decorate");

      let timestampNow = new Date();
      let timestampNowHours = timestampNow.getHours();
      timestampNow.setHours(timestampNowHours + 3);

      let timestampNowToDb = timestampNow
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      let timestampNowToReact = timestampNowToDb.slice(10, 19);
      await updateDoneTimestamp(item.itemId, timestampNowToDb);
      setStatusCompleteTime(timestampNowToReact);
      setHideClass("");
    } else {
      setDecorateClass("");
      setHideClass("hide");
    }
  };

  const editName = async (e) => {
    if (editSaveButtonIcon == editIcon) {
      setReadOnly(false);
      setEditSaveButtonText(saveIcon);
    } else {
      setReadOnly(true);
      setEditSaveButtonText(editIcon);
      let itemNewName = await itemToEdit(item.itemId, newName);

      setNewName(itemNewName);
    }
  };

  return (
    <li className="list-item flex">
      {" "}
      <div className="check-box">
        <input type="checkBox" onChange={(e) => newStatusHandler(e)} />
      </div>
      <input
        className={`list-item-text ${decorateClass}`}
        onChange={(e) => setNewName(e.target.value)}
        type="text"
        readOnly={readOnly}
        value={newName}
      />
      <div className={`status-complete-time  ${decorateClass} ${hideClass}`}>
        {statusCompleteTime}
      </div>
      {item.isPokemon ? (
        <div className={`pokemon-photo-div ${decorateClass}`}>
          {" "}
          <img src={item.pokemonData}></img>
        </div>
      ) : (
        <div className="space-div"></div>
      )}
      <div className="list-item-trash-div">
        <img
          className="list-item-trash-button"
          src={deleteIcon}
          onClick={() => itemToDelete(item.itemId)}
        />
      </div>
      <div className="list-item-edit-div">
        <img
          className="list-item-edit-button"
          src={editSaveButtonIcon}
          onClick={() => editName()}
        />
      </div>
    </li>
  );
};
export default ListItem;
