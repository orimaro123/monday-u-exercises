import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ListControls from "./ListControls";
import { getShowLoader } from "../redux/selectors/itemsViewSelectors";
import { addItemAction } from "../redux/actions/itemsEntitiesActions";

const mapStateToProps = (state, ownProps) => {
  const showLoader = getShowLoader(state);

  return { showLoader };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      addItemAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListControls);
