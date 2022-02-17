import React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionCreators } from "../store";

function Detail({ toDos, onBtnClick }) {
  const navigate = useNavigate();
  const id = parseInt(useParams().id);
  const toDo = toDos.find((toDo) => toDo.id === parseInt(id));

  const date = new Date(id).toLocaleDateString();

  const onClick = () => {
    onBtnClick(id);
    navigate("/");
  };

  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Created at: {date}</h5>
      <button onClick={onClick}>DEL</button>
      <button onClick={() => navigate("/")}>Home</button>
    </>
  );
}

function mapStateToProps(state) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch) {
  return { onBtnClick: (id) => dispatch(actionCreators.deleteToDo(id)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
