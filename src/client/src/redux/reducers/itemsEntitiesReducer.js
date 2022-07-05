import actionTypes from "../actions/constants";

const initialState = {
    itemsCount: 0
};



const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.INCREMENT:
      return { itemsCount: state.itemsCount + 1 };
      
    default:
      return state;
  }
};

export default itemsEntitiesReducer;