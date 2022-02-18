import { createStore } from "redux";
import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";

const toDoStorage = JSON.parse(localStorage.getItem("ToDoList")) || [];

//------------------code after using createSlice from redux/toolkit (refactored)----------------//

// using createSlice function, we can reduce more lines of code
const toDos = createSlice({
  name: "toDosReducer",
  initialState: toDoStorage,
  reducers: {
    add: (state, action) => {
      state.unshift({ text: action.payload, id: Date.now() });
      localStorage.setItem("ToDoList", JSON.stringify(state));
    },
    remove: (state, action) => {
      const filteredToDo = state.filter((toDo) => toDo.id !== action.payload);
      filteredToDo.length
        ? localStorage.setItem("ToDoList", JSON.stringify(filteredToDo))
        : localStorage.removeItem("ToDoList");
      return filteredToDo;
    },
  },
});

export const { add, remove } = toDos.actions;

export default configureStore({ reducer: toDos.reducer });

//-------------------code before using redux/toolkit and also createSlice from redux/toolkit -------------------//

// const ADD = "ADD";
// const DELETE = "DELETE";

// const addToDo = (text) => {
//   return { type: ADD, text };
// };

// const deleteToDo = (id) => {
//   return { type: DELETE, id };
// };

/********************redux/toolkit********************
// using createAction toolkit we can write less lines of code
//(skip constant variables for type, action definition)

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");
*****************************************************/

// const reducer = (state = storage, action) => {
//   switch (action.type) {
//     case addToDo.type:
//       const addToDos = [{ text: action.payload, id: Date.now() }, ...state];
//       localStorage.setItem("ToDoList", JSON.stringify(addToDos));
//       return addToDos;
//     case deleteToDo.type:
//       const filteredToDo = state.filter((toDo) => toDo.id !== action.payload);
//       localStorage.setItem("ToDoList", JSON.stringify(filteredToDo));
//       if (!storage.length) localStorage.removeItem("ToDoList");
//       return filteredToDo;
//     default:
//       return state;
//   }
// };

/********************redux/toolkit********************
/*
It's okay to mutate the state with createReducer
when you work with createReducer, you have two options
  1. you can return new state
  2. you can mutate the state (in this case, we shouldn't return the state)
  (the state will not mutated, redux/toolkit and immer will do something for us under the hood)
*/
/*
const reducer = createReducer(storage, {
  [addToDo]: (state, action) => {
    state.unshift({ text: action.payload, id: Date.now() });
    localStorage.setItem("ToDoList", JSON.stringify(state));
  },
  [deleteToDo]: (state, action) => {
    const filteredToDo = state.filter((toDo) => toDo.id !== action.payload);
    filteredToDo.length
      ? localStorage.setItem("ToDoList", JSON.stringify(filteredToDo))
      : localStorage.removeItem("ToDoList");
    return filteredToDo;
  },
});
*****************************************************/

// const store = createStore(reducer);

// configureStore function adds good defaults to the store setup
// we can use it with redux devtool on chrome

// export const actionCreators = {
//   addToDo,
//   deleteToDo,
// };
