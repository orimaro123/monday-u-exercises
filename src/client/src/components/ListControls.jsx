import React, { useState } from "react";

import { Button } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";

import PropTypes from "prop-types";

ListControls.propTypes = {
  itemToCreate: PropTypes.func.isRequired,
};
function ListControls({ loading, setLoading,itemToCreate }) {
  const [inputText, setInputText] = useState("");

  const inputTextHandler = () => {
    if (inputText.trim() === "") {
      console.log("this is empty state");
    } else {
      itemToCreate(inputText);
      setInputText("");
    }
  };
  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputText.trim() === "") {
        console.log("this is empty state");
      } else {
        itemToCreate(inputText);
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
        loading={loading}
        
        onClick={() => inputTextHandler()}
      >
        {" "}
        +{" "}
      </Button>
    </div>
  );
}
export default ListControls;
