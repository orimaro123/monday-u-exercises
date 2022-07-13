import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Item from "./Item";

import {
  deleteItemAction,
  editItemAction,
  updateCheckBoxAction,
} from "../../redux/actions/itemsEntitiesActions";
import {
 
  getCheckBoxCheck,
} from "../../redux/selectors/itemsEntitiesSelectors";

const mapStateToProps = (state, ownProps) => {
  const checkBoxCheckRedux = getCheckBoxCheck(state);

  return { checkBoxCheckRedux };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      deleteItemAction,
      editItemAction,
      updateCheckBoxAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
