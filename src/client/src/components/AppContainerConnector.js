import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getShowClearButton,
  getShowLoader,
  getShowToast,
  getToastContent,

} from "../redux/selectors/itemsViewSelectors";

import AppContainer from "./AppContainer";
import {
  showLoaderAction,
  hideLoaderAction,
  showClearButtonAction,
  hideClearButtonAction,
  showToastAction,
  hideToastAction,
 
  

} from "../redux/actions/itemsViewsActions";

import { addItemAction, getItemsAction ,clearAllItemsAction,} from "../redux/actions/itemsEntitiesActions";

const mapStateToProps = (state, ownProps) => {
  const showLoader = getShowLoader(state);
  const showClearButton = getShowClearButton(state);
  const showToast = getShowToast(state);
  const toastContent = getToastContent(state)

  return { showLoader, showClearButton, showToast , toastContent};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      showLoaderAction,
      hideLoaderAction,
      showClearButtonAction,
      hideClearButtonAction,
      showToastAction,
      hideToastAction,
      addItemAction,
      getItemsAction,
      clearAllItemsAction,
     
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
