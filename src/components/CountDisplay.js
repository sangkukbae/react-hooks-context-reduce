import React from "react";
import { useCountState } from "../context";

export default function CountDisplay() {
  const { count } = useCountState();
  return <div>{`The current count is ${count}`}</div>;
}
