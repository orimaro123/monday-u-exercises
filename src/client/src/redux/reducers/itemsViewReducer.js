import actionTypes from "../actions/constants";
import { Toast } from "monday-ui-react-core";

const initialState = {
  showLoader: false,
  showClearButton: false,
  showToast: false,
  toastContent: "",
  toastOrientation: Toast.types.POSITIVE,
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER: {
      return {
        ...state,
        showLoader: true,
      };
    }

    case actionTypes.HIDE_LOADER: {
      return {
        ...state,
        showLoader: false,
      };
    }

    case actionTypes.SHOW_CLEAR_BUTTON: {
      return {
        ...state,
        showClearButton: true,
      };
    }

    case actionTypes.HIDE_CLEAR_BUTTON: {
      return {
        ...state,
        showClearButton: false,
      };
    }

    case actionTypes.SHOW_TOAST: {
      return {
        ...state,
        showToast: true,
        toastContent: action.data,
     
      };
    }

    case actionTypes.HIDE_TOAST: {
      return {
        ...state,
        showToast: false,
      };
    }

    case actionTypes.TOAST_ORIENTATION_POSITIVE: {
      return {
        ...state,
        toastOrientation: Toast.types.POSITIVE,
      };
    }

    case actionTypes.TOAST_ORIENTATION_NEGATIVE: {
      return {
        ...state,
        toastOrientation: Toast.types.NEGATIVE,
      };
    }

    default:
      return state;
  }
};
export default itemsViewReducer;
