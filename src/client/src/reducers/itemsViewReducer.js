import actionTypes from "../actions/constants";

const initialState = {
  showLoader: false
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER :{
      return { showLoader: true}
    }

    case actionTypes.HIDE_LOADER :{
      return { showLoader: false}
    }
    default:
      return state;
  }
};
export default itemsViewReducer;