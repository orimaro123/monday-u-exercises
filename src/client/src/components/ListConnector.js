import { connect } from "react-redux";

import List from "./List";
import { getItems } from "../redux/selectors/itemsEntitiesSelectors";

const mapStateToProps = (state, ownProps) => {
  const items = getItems(state);

  return { items };
};

export default connect(mapStateToProps)(List);
