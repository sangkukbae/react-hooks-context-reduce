# react-hooks-context-reduce


:bulb: Note that you can still choose whether to pass the application state down as props (more explicit) or as context (more convenient for very deep updates). If you use context to pass down the state too, **use two different context types — the dispatch context never changes**, so components that read it don’t need to rerender unless they also need the application state.

```jsx
import React, { createContext, useReducer } from "react";

const CountStateContext = createContext();
const CountDispatchContext = createContext();

const initailState = {
  count: 0
};

function countReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = useReducer(countReducer, initailState);
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

function useCountState() {
  const context = React.useContext(CountStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}

function useCountDispatch() {
  const context = React.useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}

function useCount() {
  return [useCountState(), useCountDispatch()];
}

export { CountProvider, useCountState, useCountDispatch, useCount };
```
**src/components/CountDisplay.js**
```jsx
import React from "react";
import { useCountState, useCount } from "../context";

export default function CountDisplay() {
  const { count } = useCountState();
  // const [{ count }, dispatch] = useCount();
  return (
    <div>
      {`The current count is ${count}`}
      {/* <button onClick={() => dispatch({ type: "increment" })}>+</button> */}
    </div>
  );
}
```
**src/components/Counter.js**
```jsx
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
```
**shorthand**
```jsx
const { count } = useCountState();
const dispatch = useCountDispatch();

or 

const [{ count }, dispatch] = useCount();
```

[https://codesandbox.io/s/react-hooks-contex-reduce-1ml9s](https://codesandbox.io/s/react-hooks-contex-reduce-1ml9s)

:memo: **참고 자료**   
* [https://kentcdodds.com/blog/how-to-use-react-context-effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively) :bookmark:   
* [https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down)   
* [https://reactjs.org/docs/hooks-reference.html#usereducer](https://reactjs.org/docs/hooks-reference.html#usereducer)   
* [https://reactjs.org/docs/context.html#reactcreatecontext](https://reactjs.org/docs/context.html#reactcreatecontext)   



