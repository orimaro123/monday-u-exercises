import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Item from "./Item";


import  {deleteItemAction , editItemAction, updateCheckBoxAction} from "../../redux/actions/itemsEntitiesActions";
import { getItems , getCheckBoxCheck} from "../../redux/selectors/itemsEntitiesSelectors";

const mapStateToProps = (state, ownProps) => {
 
   const items = getItems(state)
    const checkBoxCheckRedux = getCheckBoxCheck(state)
  
  return {  checkBoxCheckRedux, items};
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