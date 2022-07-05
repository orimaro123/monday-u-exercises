import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getShowClearButton,
  getShowLoader,
} from "../redux/selectors/itemsViewSelectors";
import { getItemsCount } from "../redux/selectors/itemsEntitiesSelectors";
import AppContainer from "./AppContainer";
import {
  showLoaderAction,
  hideLoaderAction,
  showClearButtonAction,
  hideClearButtonAction,
} from "../redux/actions/itemsViewsActions";

const mapStateToProps = (state, ownProps) => {
  const showLoader = getShowLoader(state);
  const showClearButton = getShowClearButton(state);

  const itemsCount = getItemsCount(state);

  return { showLoader,  showClearButton, itemsCount, };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      showLoaderAction,
      hideLoaderAction,
      showClearButtonAction,
      hideClearButtonAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
