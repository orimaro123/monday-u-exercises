import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Item from "./Item";


import  {deleteItemAction } from "../redux/actions/itemsEntitiesActions";

const mapStateToProps = (state, ownProps) => {
 
  
  return {  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
        deleteItemAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);