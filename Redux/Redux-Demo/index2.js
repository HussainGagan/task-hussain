const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreaters = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const logger = require("redux-logger").createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";

const CAKE_RESTOKED = "CAKE_RESTOKED";

const ICECREAM_ORDERED = "ICECREAM_ORDERED";

const ICECREAM_RESTOKED = "ICECREAM_RESTOKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOKED,
    payload: qty,
  };
}

const initialCakeState = {
  noOfCakes: 10,
};

const initialIceCreamState = {
  noOfIceCream: 20,
};

const cakeReducer = function (state = initialCakeState, action) {
  // console.log("cake reducer called");
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

const iceCreamReducer = function (state = initialIceCreamState, action) {
  // console.log("ice reducer called");
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        noOfIceCream: state.noOfIceCream - 1,
      };
    case ICECREAM_RESTOKED:
      return {
        ...state,
        noOfIceCream: state.noOfIceCream + action.payload,
      };
    // case CAKE_ORDERED:
    //   return {
    //     ...state,
    //     noOfIceCream: state.noOfIceCream - 1,
    //   };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  ice: iceCreamReducer,
});
//* When we dispatch an action both the reducer recieves that action, one of them acts on the action and the other just ignores it

const store = createStore(rootReducer, applyMiddleware(logger));
// console.log("Initial State ", store.getState());

const unsubscribe = store.subscribe(() => {});

// store.dispatch(orderCake()); // Allows the state to be updated and it takes action as an arg
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreaters(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(3);

unsubscribe();
