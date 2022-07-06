import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getShowClearButton,
  getShowLoader,
  getShowToastValue,
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

import { addItemAction, getItemsAction ,clearAllItemsAction} from "../redux/actions/itemsEntitiesActions";

const mapStateToProps = (state, ownProps) => {
  const showLoader = getShowLoader(state);
  const showClearButton = getShowClearButton(state);
  const showToastValue = getShowToastValue(state);

  return { showLoader, showClearButton, showToastValue };
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
