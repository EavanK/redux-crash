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
