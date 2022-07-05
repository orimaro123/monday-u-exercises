import React, { useState } from "react";

import { Button } from "monday-ui-react-core";

import PropTypes from "prop-types";

function Search({}) {
  return (
    <div className="search-div">
      <input type="text" id="search-input" placeholder="Search... " />

      <Button id="search-button"> 🔎 </Button>
    </div>
  );
}
export default Search;
