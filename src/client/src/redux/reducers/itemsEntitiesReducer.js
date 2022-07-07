import actionTypes from "../actions/constants";
import { STATUS } from "../../hooks/useFilterByQuery";

const initialState = {
  itemsCount: 0,
  items: [],
  query: {
    status: STATUS.ALL,
    name: '',
  },
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { itemsCount: state.itemsCount + 1 };

    case actionTypes.ADD_ITEMS:
      return { items: [...state.items, ...action.data] };

    case actionTypes.CLEAR_ALL_ITEMS:
      return {
        items: [],
      };

    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.itemId !== action.payload),
      };

    case actionTypes.EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.itemId === action.itemId
            ? { ...item, itemName: action.payload }
            : item
        ),
      };

    case actionTypes.UPDATE_QUERY_STATUS:
      return {
        ...state,
        query: { ...state.query, status: action.payload },
      };

    case actionTypes.UPDATE_QUERY_NAME:
      return {
        ...state,
        query: { ...state.query, name: action.payload },
      };

    default:
      return state;
  }
};

export default itemsEntitiesReducer;
