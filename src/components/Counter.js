import React from "react";
import { useCountDispatch } from "../context";

export default function Counter() {
  const dispatch = useCountDispatch();
  return (
    <div>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
