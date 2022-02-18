import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

// const ADD = "ADD";
// const DELETE = "DELETE";

// const addToDo = (text) => {
//   return { type: ADD, text };
// };

// const deleteToDo = (id) => {
//   return { type: DELETE, id };
// };

// using createAction toolkit we can write less lines of code
//(skip constant variables for type, action definition)
const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const storage = JSON.parse(localStorage.getItem("ToDoList")) || [];

const reducer = (state = storage, action) => {
  switch (action.type) {
    case addToDo.type:
      const addToDos = [{ text: action.payload, id: Date.now() }, ...state];
      localStorage.setItem("ToDoList", JSON.stringify(addToDos));
      return addToDos;
    case deleteToDo.type:
      const filteredToDo = state.filter((toDo) => toDo.id !== action.payload);
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
