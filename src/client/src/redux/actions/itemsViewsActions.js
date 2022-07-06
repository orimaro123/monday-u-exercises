import actionTypes from "./constants";

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

const showToastValue = () => ({
  type: actionTypes.SHOW_TOAST,
});

const hideToastValue = () => ({
  type: actionTypes.HIDE_TOAST,
});

export const showLoaderAction = () => {
  return (dispatch) => dispatch(showLoader());
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

export const showToastAction = () => {
  return (dispatch) => dispatch(showToastValue());
};

export const hideToastAction = () => {
  return (dispatch) => dispatch(hideToastValue());
};