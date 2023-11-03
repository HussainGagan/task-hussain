import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noOfCakes: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.noOfCakes--;
    },
    restocked: (state, action) => {
      console.log(action);
      state.noOfCakes += action.payload;
    },
  },
});

export default cakeSlice.reducer;
export const { ordered, restocked } = cakeSlice.actions;
