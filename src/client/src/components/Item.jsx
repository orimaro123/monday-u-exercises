import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import editIcon from "../images/edit-icon.svg";
import saveIcon from "../images/save-icon.svg";
import deleteIcon from "../images/delete-icon.svg";

const Item = ({
  item,
  items,
  deleteItemAction,
  editItemAction,
  editItem,
  updateCheckBoxAction,
  checkBoxCheckRedux,
}) => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState(item.itemName);
  const [editSaveButtonIcon, setEditSaveButtonText] = useState(editIcon);

  const [statusCompleteTime, setStatusCompleteTime] = useState("");
  const [hideClass, setHideClass] = useState("");
  const [readOnly, setReadOnly] = useState(true);
  const [decorateClass, setDecorateClass] = useState("");

  const newStatusHandler = async (e) => {
    if (e.target.checked) {
      setDecorateClass("decorate");

      updateCheckBoxAction(item.itemId, e.target.checked);

      const timestampNow = new Date();
      const timestampNowHours = timestampNow.getHours();
      timestampNow.setHours(timestampNowHours + 3);

      const timestampNowToDb = timestampNow
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const timestampNowToReact = timestampNowToDb.slice(10, 19);

      setStatusCompleteTime(`Done at ${timestampNowToReact}`);
      setHideClass("");
      return;
    } else {
      updateCheckBoxAction(item.itemId, false);

      setDecorateClass("");
      setHideClass("hide");
    }
  };

  const editName = async () => {
    if (editSaveButtonIcon === editIcon) {
      setReadOnly(false);
      setEditSaveButtonText(saveIcon);
      return;
    }
    setReadOnly(true);
    setEditSaveButtonText(editIcon);

    editItemAction(item.itemId, newName);
  };
  const deleteItemHandler = () => {
    deleteItemAction(item.itemId, item.itemName);
  };

  useEffect(() => {
    if (item.status) {
      setDecorateClass("decorate");

      const timeFromDb = item.doneAt
        .slice(0, 19)
        .replace("T", " ")
        .slice(10, 19);

      const timeHours = timeFromDb.slice(0, 3);
      const correctHours = Number(timeHours) + 3;

      const correctTimeToReact = timeFromDb.replace(
        timeHours,
        correctHours.toString()
      );
      setStatusCompleteTime(`Done at ${correctTimeToReact}`);
    }
  }, [item]);

  return (
    <li className="list-item flex">
      <div className="check-box">
        <input
          type="checkBox"
          checked={item.status}
          onChange={newStatusHandler}
          onClick={() => updateCheckBoxAction(item.itemId, !item.status)}
        />
      </div>
      <input
        className={`list-item-text ${decorateClass}`}
        onChange={(e) => setNewName(e.target.value)} //setNewName(e.target.value)
        type="text"
        readOnly={readOnly}
        value={newName}
      />
      {item.isPokemon ? (
        <div className={`pokemon-photo-div ${decorateClass}`}>
          {" "}
          <img className="pokemon-photo" src={item.pokemonData} alt=""></img>
        </div>
      ) : (
        <div className="space-div"></div>
      )}
      <div className={`status-complete-time   ${hideClass}`}>
        {statusCompleteTime}
      </div>
      <div className="list-item-trash-div">
        <img
          className="list-item-trash-button"
          src={deleteIcon}
          alt="trash"
          onClick={deleteItemHandler}
        />
      </div>
      <div className="list-item-edit-div">
        <img
          className="list-item-edit-button"
          src={editSaveButtonIcon}
          alt={"edit icon"}
          onClick={editName}
        />
      </div>
    </li>
  );
};

export default Item;
