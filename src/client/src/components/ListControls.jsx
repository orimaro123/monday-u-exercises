import React, { useState } from "react";

import { Button } from "monday-ui-react-core";


import PropTypes from "prop-types";

ListControls.propTypes = {
  itemToCreate: PropTypes.func.isRequired,
};
function ListControls({ showLoader, createItemHandler }) {
  const [inputText, setInputText] = useState("");

  const inputTextHandler = () => {
    if (inputText.trim() === "") {
      console.log("this is empty state"); //todo red toaster
    } else {
      createItemHandler(inputText);
      setInputText("");
    }
  };
  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputText.trim() === "") {
        console.log("this is empty state"); //todo red toaster
      } else {
        createItemHandler(inputText);
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
        
        onClick={() => inputTextHandler()}
      >
        {" "}
        +{" "}
      </Button>
    </div>
  );
}
export default ListControls;
