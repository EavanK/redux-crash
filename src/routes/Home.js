import { useState } from "react";
import { connect } from "react-redux";
import ToDo from "../components/ToDo";
import { add } from "../store";

function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addToDo(text);
    setText("");
  };

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} required />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

// same as store.getState()
function mapStateToProps(state, ownProps) {
  return { toDos: state };
}

// same as store.dispatch()
function mapDispatchToProps(dispatch, ownProps) {
  return { addToDo: (text) => dispatch(add(text)) };
}

// connect(mapStateToProps(state, ownProps))(Component) - basically send state and dispatch to this component
export default connect(mapStateToProps, mapDispatchToProps)(Home);
