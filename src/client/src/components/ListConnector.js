import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "./List";
import { getItems } from "../redux/selectors/itemsEntitiesSelectors";
import { addItemAction } from "../redux/actions/itemsEntitiesActions";


const mapStateToProps = (state, ownProps) => {
  const items = getItems(state);
  
  return { items };
};


export default connect(mapStateToProps,)(List);
