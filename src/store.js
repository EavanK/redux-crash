import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return { type: ADD, text };
};

const deleteToDo = (id) => {
  return { type: DELETE, id };
};

const storage = JSON.parse(localStorage.getItem("ToDoList")) || [];

const reducer = (state = storage, action) => {
  switch (action.type) {
    case ADD:
      const addToDo = [{ text: action.text, id: Date.now() }, ...state];
      localStorage.setItem("ToDoList", JSON.stringify(addToDo));
      return addToDo;
    case DELETE:
      const filteredToDo = state.filter((toDo) => toDo.id !== action.id);
      localStorage.setItem("ToDoList", JSON.stringify(filteredToDo));
      if (!storage.length) localStorage.removeItem("ToDoList");
      return filteredToDo;
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
