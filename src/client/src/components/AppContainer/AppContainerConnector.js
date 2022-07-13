import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getShowClearButton,
  getShowToast,
  getToastContent,
  getToastOrientation,
} from "../../redux/selectors/itemsViewSelectors";

import AppContainer from "./AppContainer";
import { hideToastAction } from "../../redux/actions/itemsViewsActions";

import {
  getItemsAction,
  clearAllItemsAction,
} from "../../redux/actions/itemsEntitiesActions";

const mapStateToProps = (state, ownProps) => {
  const showClearButton = getShowClearButton(state);
  const showToast = getShowToast(state);
  const toastContent = getToastContent(state);
  const toastOrientation = getToastOrientation(state);

  return {
    showClearButton,
    showToast,
    toastContent,
    toastOrientation,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      hideToastAction,

      getItemsAction,
      clearAllItemsAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
