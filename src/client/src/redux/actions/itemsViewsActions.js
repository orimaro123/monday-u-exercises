import actionTypes from "./constants";
import { Toast } from "monday-ui-react-core";

const showLoader = () => ({
  type: actionTypes.SHOW_LOADER,
});

const hideLoader = () => ({
  type: actionTypes.HIDE_LOADER,
});

const showClearButton = () => ({
  type: actionTypes.SHOW_CLEAR_BUTTON,
});

const hideClearButton = () => ({
  type: actionTypes.HIDE_CLEAR_BUTTON,
});

const showToast = (content) => ({
  type: actionTypes.SHOW_TOAST,
  data: content,
});

const hideToast = () => ({
  type: actionTypes.HIDE_TOAST,
});

const toastOrientationPositive = () => ({
  type: actionTypes.TOAST_ORIENTATION_POSITIVE,
})

const toastOrientationNegative = () => ({
  type: actionTypes.TOAST_ORIENTATION_NEGATIVE,
})


export const showLoaderAction = () => {
  return (dispatch) => {
    dispatch(showLoader());
  };
};

export const hideLoaderAction = () => {
  return (dispatch) => dispatch(hideLoader());
};

export const showClearButtonAction = () => {
  return (dispatch) => dispatch(showClearButton());
};

export const hideClearButtonAction = () => {
  return (dispatch) => dispatch(hideClearButton());
};

export const showToastAction = (content) => {
  return (dispatch) => {
   
    
    dispatch(showToast(content));
  }
};

export const hideToastAction = () => {
  return (dispatch) => dispatch(hideToast());
};

export const toastOrientationPositiveAction = () => {
  return (dispatch) => dispatch(toastOrientationPositive());

}

export const toastOrientationNegativeAction = () => {
  return (dispatch) => dispatch(toastOrientationNegative());

}

export const emptyInputAction = () => {
  return async (dispatch) => {

  
    dispatch(toastOrientationNegativeAction())
    dispatch(showToastAction(`No input was entered`));
  
  }


}
