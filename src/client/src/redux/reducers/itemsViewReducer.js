import actionTypes from "../actions/constants";

const initialState = {
  showLoader: false,
  showClearButton: "",
  openToast: false,
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER :{
      return { showLoader: true}
    }

    case actionTypes.HIDE_LOADER :{
      return { showLoader: false}
    }

    case actionTypes.SHOW_CLEAR_BUTTON :{
      return { showClearButton: ""}
    }

    case actionTypes.HIDE_CLEAR_BUTTON :{
      return { showClearButton: "hide"}
    }

    case actionTypes.OPEN_TOAST :{
      return { openToast: false}
    }

    default:
      return state;
  }
};
export default itemsViewReducer;