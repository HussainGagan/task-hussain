const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreaters = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";

const CAKE_RESTOKED = "CAKE_RESTOKED";

//* An action creater is a function that returns an action (creates an action)
function orderCake() {
  //* An action is an object with a type property
  return {
    type: CAKE_ORDERED,
    payload: 1, // In Redux the convention is to use a property called payload for any additional info you want to send and this is for every action in your codebase
  };
}

function restockCake(qty = 1) {
  //* An action is an object with a type property
  return {
    type: CAKE_RESTOKED,
    payload: qty,
  };
}

const initialState = {
  noOfCakes: 10,
};

//* reducer is a pure function which accepts the current state and action as arguments and based on the action type it return the next state of the application.

const reducer = function (state = initialState, action) {
  console.log("reducer called");
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        noOfCakes: state.noOfCakes - 1,
      };
    case CAKE_RESTOKED:
      return {
        ...state,
        noOfCakes: state.noOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer); // reducer has the initial state of the app
console.log("Initial State ", store.getState());

// Subscribing the app to the changes in the store and it returns a function which allows us to unsuscribe to the changes in the store or we can say unregistering of the listeners
//* Any time the store updates, the function passed to the subscribe() will be called
const unsubscribe = store.subscribe(() =>
  console.log("Updated State ", store.getState())
);

// store.dispatch(orderCake()); // Allows the state to be updated and it takes action as an arg
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreaters({ orderCake, restockCake }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
// bindActionCreater() turns an object whose values are action creaters into an object with the same keys but every action creater wrapped into a dispatch call, so they can be invoked directly

// console.log("New State ", store.getState());

unsubscribe(); //* Dispatching an action after unsubscribing will not log the updated state to the console coz we have unsubscribed to the changes in the store but it will update the state just that we won't be notified.

// store.dispatch(orderCake());
