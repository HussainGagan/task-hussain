import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./cakeSlice";

export default function CakeView() {
  console.log("cake");

  const noOfCakes = useSelector((state) => state.cake.noOfCakes);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of cakes - {noOfCakes}</h2>
      <button onClick={() => dispatch(ordered())}>Order cake</button>
      <button onClick={() => dispatch(restocked(5))}>Restock cakes</button>
    </div>
  );
}
