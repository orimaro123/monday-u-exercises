import actionTypes from "../actions/constants";

const initialState = {
    value: 0
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.INCREMENT:
      return { value: state.value + 1 };
      
    default:
      return state;
  }
};

export default itemsEntitiesReducer;