import actionTypes from "../actions/constants";
import { Toast } from "monday-ui-react-core";

const initialState = {
  showLoader: false,
  showClearButton: false,
  showToast: false,
  toastContent: "",
  toastOrientation: Toast.types.POSITIVE
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER: {
      return {
        showLoader: true,
        showClearButton: state.showClearButton,
        showToast: state.showToast,
        toastContent: state.toastContent,
        toastOrientation: state.toastOrientation,
      };
    }

    case actionTypes.HIDE_LOADER: {
      return {
        showLoader: false,
        showClearButton: state.showClearButton,
        showToast: state.showToast,
        toastContent: state.toastContent,
        toastOrientation: state.toastOrientation,
      };
    }

    case actionTypes.SHOW_CLEAR_BUTTON: {
      return {
        showClearButton: true,
        showToast: state.showToast,
        showLoader: state.showLoader,
        toastContent: state.toastContent,
        toastOrientation: state.toastOrientation,
      };
    }

    case actionTypes.HIDE_CLEAR_BUTTON: {
      return {
        showClearButton: false,
        showToast: state.showToast,
        showLoader: state.showLoader,
        toastContent: state.toastContent,
        toastOrientation: state.toastOrientation,
      };
    }

    case actionTypes.SHOW_TOAST: {
      return {
        showToast: true,
        showLoader: state.showLoader,
        showClearButton: state.showClearButton,
        toastContent: action.data,
        toastOrientation: state.toastOrientation,
      };
    }

    case actionTypes.HIDE_TOAST: {
      return {
        showToast: false,
        showLoader: state.showLoader,
        showClearButton: state.showClearButton,
        toastContent: state.toastContent,
        toastOrientation: state.toastOrientation,
      };
    }

    case actionTypes.TOAST_ORIENTATION_POSITIVE: {
      return {
        showToast: state.showToast,
        showLoader: state.showLoader,
        showClearButton: state.showClearButton,
        toastContent: state.toastContent,
        toastOrientation: Toast.types.POSITIVE,
      };
    }

    case actionTypes.TOAST_ORIENTATION_NEGATIVE: {
      return {
        showToast: state.showToast,
        showLoader: state.showLoader,
        showClearButton: state.showClearButton,
        toastContent: state.toastContent,
        toastOrientation: Toast.types.NEGATIVE,
      };
    }

    default:
      return state;
  }
};
export default itemsViewReducer;
