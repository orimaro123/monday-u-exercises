import actionTypes from "../actions/constants";

const initialState = {
  showLoader: false,
  showClearButton: false,
  showToastValue: false,
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER: {
      return {
        showLoader: true,
        showClearButton: state.showClearButton,
        showToastValue: state.showToastValue,
      };
    }

    case actionTypes.HIDE_LOADER: {
      return {
        showLoader: false,
        showClearButton: state.showClearButton,
        showToastValue: state.showToastValue,
      };
    }

    case actionTypes.SHOW_CLEAR_BUTTON: {
      return {
        showClearButton: true,
        showToastValue: state.showToastValue,
        showLoader: state.showLoader,
      };
    }

    case actionTypes.HIDE_CLEAR_BUTTON: {
      return {
        showClearButton: false,
        showToastValue: state.showToastValue,
        showLoader: state.showLoader,
      };
    }

    case actionTypes.SHOW_TOAST: {
      return {
        showToastValue: true,
        showLoader: state.showLoader,
        showClearButton: state.showClearButton,
      };
    }

    case actionTypes.HIDE_TOAST: {
      return {
        showToastValue: false,
        showLoader: state.showLoader,
        showClearButton: state.showClearButton,
      };
    }

    default:
      return state;
  }
};
export default itemsViewReducer;
