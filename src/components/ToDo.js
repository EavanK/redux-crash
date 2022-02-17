import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../store";

function ToDo({ text, onBtnClick, id }) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}

// same as store.dispatch()
function mapDispatchToProps(dispatch, ownProps) {
  return { onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id)) };
}

// connect(mapStateToProps(state, ownProps))(Component) - basically send state and dispatch to this component
export default connect(null, mapDispatchToProps)(ToDo);
