const redux = require("redux");
const createStore = redux.legacy_createStore;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const applyMiddleware = redux.applyMiddleware;

const logger = require("redux-logger").createLogger();

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

function fetchUsersReq() {
  return {
    type: FETCH_USER_REQUESTED,
  };
}
function fetchUsersSuccess(users) {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users,
  };
}
function fetchUsersFailed(err) {
  return {
    type: FETCH_USER_FAILED,
    payload: err,
  };
}

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = function () {
  return function (dispatch) {
    dispatch(fetchUsersReq());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        dispatch(fetchUsersFailed(err.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));

// store.subscribe(() => console.log("Updated State ", store.getState()));

// The thunk middleware looks for any functions that were passed to `store.dispatch`. If this "action" is really a function, calls it and returns the result.
store.dispatch(fetchUsers());
