const { cakeActions } = require("../cake/cakeSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  noOfIcecreams: 20,
};

const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.noOfIcecreams--;
    },
    restocked: (state, action) => {
      state.noOfIcecreams += action.payload;
    },
  },

  //* It allows createSlice to respond to other action types besides the types it has generated
  extraReducers: (builder) => {
    builder.addCase(cakeActions.ordered, (state) => {
      state.noOfIcecreams--;
    });
  },
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
