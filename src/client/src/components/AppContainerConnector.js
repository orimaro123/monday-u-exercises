import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getShowLoader } from "../selectors/itemsViewSelectors";
import AppContainer from "./AppContainer";
import {
  showLoaderAction,
  hideLoaderAction,
} from "../actions/itemsViewsActions";

const mapStateToProps = (state, ownProps) => {
  const showLoader = getShowLoader(state);
  console.log("showLoader: ", showLoader);

  return { showLoader };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // TODO bind decrementAction and resetAction action creators
  return bindActionCreators({ showLoaderAction, hideLoaderAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
