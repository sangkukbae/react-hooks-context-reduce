import React from "react";
import "./styles.css";
import CountDisplay from "./components/CountDisplay";
import Counter from "./components/Counter";
import { CountProvider } from "./context";

export default function App() {
  return (
    <div className="App">
      <CountProvider>
        <h1>react hooks: context, reduce</h1>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
}
