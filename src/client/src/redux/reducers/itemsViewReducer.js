import actionTypes from "../actions/constants";

const initialState = {
  showLoader: false,
  showClearButton: false,
  showToast: false,
  toastContent: "",
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER: {
      return {
        showLoader: true,
        showClearButton: state.showClearButton,
        showToast: state.showToast,
        toastContent: state.toastContent,
      };
    }

    case actionTypes.HIDE_LOADER: {
      return {
        showLoader: false,
        showClearButton: state.showClearButton,
        showToast: state.showToast,
        toastContent: state.toastContent,
      };
    }

    case actionTypes.SHOW_CLEAR_BUTTON: {
      return {
        showClearButton: true,
        showToast: state.showToast,
        showLoader: state.showLoader,
        toastContent: state.toastContent,
      };
    }

    case actionTypes.HIDE_CLEAR_BUTTON: {
      return {
        showClearButton: false,
        showToast: state.showToast,
        showLoader: state.showLoader,
        toastContent: state.toastContent,
      };
    }

    case actionTypes.SHOW_TOAST: {
      return {
        showToast: true,
        showLoader: state.showLoader,
        showClearButton: state.showClearButton,
        toastContent: action.data,
      };
    }

    case actionTypes.HIDE_TOAST: {
      return {
        showToast: false,
        showLoader: state.showLoader,
        showClearButton: state.showClearButton,
        toastContent: state.toastContent,
      };
    }

    default:
      return state;
  }
};
export default itemsViewReducer;
