
import itemsEntities from "./itemsEntitiesReducer";
import itemsView from "./itemsViewReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  itemsEntities,
  itemsView
});

export default allReducers;