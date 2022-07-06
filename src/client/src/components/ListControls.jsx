import React, { useState } from "react";

import { Button } from "monday-ui-react-core";


function ListControls({ showLoader,  addItemAction}) {
  const [inputText, setInputText] = useState("");

  const inputTextHandler = () => {
    if (inputText.trim() === "") {
      console.log("this is empty state"); //todo red toaster
    } else {
    
     addItemAction(inputText)
      setInputText("");
    }
  };
  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputText.trim() === "") {
        console.log("this is empty state"); //todo red toaster
      } else {
     
       addItemAction(inputText)
        setInputText("");
        e.target.value = "";
      }
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
