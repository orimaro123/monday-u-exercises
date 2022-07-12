import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Filter from "./Filter";


import  {} from "../../redux/actions/itemsEntitiesActions";
import {getQuery, getQueryName } from "../../redux/selectors/itemsEntitiesSelectors";

const mapStateToProps = (state, ownProps) => {
 
  const query = getQuery(state)
  const queryName = getQueryName(state)
  
  return { query, queryName};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
  
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);