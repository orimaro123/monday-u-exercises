import actionTypes from "./constants";

const showLoader = () => ({
  type: actionTypes.SHOW_LOADER,
});

const hideLoader = () => ({
  type: actionTypes.HIDE_LOADER,
});

export const showLoaderAction = () => {
  return (dispatch) => dispatch(showLoader());
};

export const hideLoaderAction = () => {
  return (dispatch) => dispatch(hideLoader());
};
