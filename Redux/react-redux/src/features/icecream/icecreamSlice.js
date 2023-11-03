import {
  ordered as cakeOrdered,
  restocked as cakeRestocked,
} from "../cake/cakeSlice";

import { createSlice } from "@reduxjs/toolkit";

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
    builder.addCase(cakeOrdered, (state) => {
      state.noOfIcecreams--;
    });
    // .addCase(cakeRestocked, (state, action) => {
    //   state.noOfIcecreams += action.payload;
    // });
  },
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
