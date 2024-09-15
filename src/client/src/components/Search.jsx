import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateQueryName } from "../redux/actions/itemsEntitiesActions";
import { getQueryName } from "../redux/selectors/itemsEntitiesSelectors";

function Search() {
  const name = useSelector(getQueryName);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(updateQueryName(e.target.value));
  };

  return (
    <div className="search-div">
      <input
        type="text"
        id="search-input"
        placeholder="Search... "
        value={name}
        onChange={handleChange}
      />
    </div>
  );
}
export default Search;
