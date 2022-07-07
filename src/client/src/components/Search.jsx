import React, { useState } from "react";

import { Button } from "monday-ui-react-core";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateQueryName } from "../redux/actions/itemsEntitiesActions";

// todo: move this to selectors
const getQueryName = (state) => state?.itemsEntities?.query?.name ?? '';

function Search({}) {
  const name = useSelector(getQueryName)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(updateQueryName(e.target.value));
  }

  return (
    <div className="search-div">
      <input type="text" id="search-input" placeholder="Search... " value={name} onChange={handleChange} />

   
    </div>
  );
}
export default Search;
