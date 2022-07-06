import actionTypes from "../actions/constants";

const initialState = {
  itemsCount: 0,
  items: [],
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { itemsCount: state.itemsCount + 1 };

    case actionTypes.ADD_ITEMS:
      return { items: [...state.items, ...action.data] };

      case actionTypes.CLEAR_ALL_ITEMS:
        return { items: [] };  

    default:
      return state;
  }
};

export default itemsEntitiesReducer;
