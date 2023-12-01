import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';


const menu = (state = [], action) => {
  if (action.type === "GET_ALL_PIZZAS") {
    return action.payload
  } return state;
}

const cartContents = (state=[], action) => {
  if (action.type === "ADD_TO_CART"){
    return [...state, action.payload]
  } else if (action.type === "REMOVE_FROM_CART") {
  return state.filter(pizza => action.payload !== pizza.id)
  } return state
}

const currentCustomer = (state={}, action) => {
  if (action.type === "SAVE_CUSTOMER_INFO"){
    // action.payload is our current customer object
    return action.payload
  } 
  return state
}

const totalPrice = (state='$0.00', action) => {
  if (action.type === "UPDATE_PRICE") {
    return action.payload
  }
  return state
}

const store = createStore(
  combineReducers({
    menu,
    cartContents,
    currentCustomer,
    totalPrice
  }),
  applyMiddleware(logger),
);


export default store;
