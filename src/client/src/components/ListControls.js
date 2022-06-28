import React, { useState } from "react";

const ListControls = ({ itemToCreate }) => {
  const [inputText, setInputText] = useState("");



  return (
    <div className="listControls">
      <input
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        type="text"
        id="listItemInput"
        placeholder="Add your new todo"
      />
      <button type="button" id="listItemSubmit" onClick={() => itemToCreate(inputText)}>
        +
      </button>
    </div>
  );
};
export default ListControls;
