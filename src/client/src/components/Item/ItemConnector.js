import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Item from "./Item";

import {
  deleteItemAction,
  editItemAction,
  updateCheckBoxAction,
} from "../../redux/actions/itemsEntitiesActions";


const mapStateToProps = () => {
 
  return {  };
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
