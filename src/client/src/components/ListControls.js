import React from "react";

const ListControls = () => {

  const inputTextHandler = (e) => {
    console.log(e);
  }



  return (<div className="listControls">
  
  <input type="text" id="listItemInput" placeholder="Add your new todo" />
        <button type="button" id="listItemSubmit">
          +
        </button>
  </div>);
};
export default ListControls;
