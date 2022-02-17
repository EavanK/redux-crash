import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

// 2. reducre function - the only function that modifies the state and return the state
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

// 1. createStore - (the state) takes reducer function
const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

// 4. subcribe allows us to listen for changes in our store
// whenever the state changes it will call the function (onChange)
countStore.subscribe(onChange);

const hadleAdd = () => {
  // 3. create dispatch to modify state that we want (action)
  countStore.dispatch({ type: ADD });
};

const hadleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", hadleAdd);
minus.addEventListener("click", hadleMinus);

//------------------------------------------------------------------------------------------------//

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return { type: ADD_TODO, text };
};

const deleteToDo = (id) => {
  return { type: DELETE_TODO, id };
};

// * we should never mutate the state (never do state.push() or state.pop())
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const filteredToDo = state.filter((toDo) => toDo.id !== action.id);
      return filteredToDo;
    default:
      return state;
  }
};

const store = createStore(reducer);

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerText = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    ul.appendChild(li);
    li.appendChild(btn);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
