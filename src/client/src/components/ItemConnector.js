import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Item from "./Item";


import  {deleteItemAction , editItemAction} from "../redux/actions/itemsEntitiesActions";
import { getItems } from "../redux/selectors/itemsEntitiesSelectors";

const mapStateToProps = (state, ownProps) => {
 
    const items = getItems(state)
  
  return { items };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
        deleteItemAction,
        editItemAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);