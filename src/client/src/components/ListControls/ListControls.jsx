import React, { useState } from "react";

import { Button } from "monday-ui-react-core";

function ListControls({ showLoader, addItemAction, emptyInputAction }) {
  const [inputText, setInputText] = useState("");

  const inputTextHandler = () => {
    if (inputText.trim() === "") {
      emptyInputAction();
    } else {
      addItemAction(inputText);
      setInputText("");
    }
  };
  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      inputTextHandler();
    }
  };

  return (
    <div className="list-controls">
      <input
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        value={inputText}
        onKeyDown={(e) => handleEnterKeyDown(e)}
        type="text"
        id="list-item-input"
        placeholder="Add your new todo"
      />

      <Button
        id="list-item-submit"
        loading={showLoader}
        onClick={inputTextHandler}
      >
        +
      </Button>
    </div>
  );
}
export default ListControls;
