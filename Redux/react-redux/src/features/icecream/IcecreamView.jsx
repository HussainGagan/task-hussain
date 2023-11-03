import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./icecreamSlice";

export default function IcecreamView() {
  console.log("ice");

  const [value, setValue] = useState(1);
  const noOfIcecreams = useSelector((state) => state.icecream.noOfIcecreams);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of ice creams - {noOfIcecreams}</h2>
      <button onClick={() => dispatch(ordered())}>Order ice creams</button>
      <input
        type="text"
        placeholder="Enter items for restock"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <button onClick={() => dispatch(restocked(value))}>
        Restock ice creams
      </button>
    </div>
  );
}
