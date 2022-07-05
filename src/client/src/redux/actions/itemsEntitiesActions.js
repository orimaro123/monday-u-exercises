import actionsTypes from "./constants";

const increment = () => ({
  type: actionsTypes.INCREMENT
});

// TODO create decrement and reset actions

export const incrementAction = () => {
  return dispatch => {
    dispatch(increment());
  };
};
/* 


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
}; */
