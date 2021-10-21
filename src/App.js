import * as React from "react";
import "./styles.css";

export default function App() {
  return (
    <CountProvider>
      <div className="App">
        <Header />
        <DisplayCounter />

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <OtherStuff />
            <OddOrEven />
            <ResetNumber />
          </div>
          <CounterStuff />
        </div>
        <Footer />
      </div>
    </CountProvider>
  );
}

function OddOrEven() {
  const {
    state: { count }
  } = useCount();

  return (
    <div>
      <h2>Is the number odd or even?</h2>
      {count % 2 === 0 ? "EVEN" : "ODD"}
    </div>
  );
}

function ResetNumber() {
  const { dispatch } = useCount();

  return (
    <div>
      <h2>Start all over again?</h2>
      <button onClick={() => dispatch({ type: "reset" })}>Yes please</button>
    </div>
  );
}

function OtherStuff() {
  React.useEffect(() => {
    console.log("render OtherStuff");
  });

  return (
    <div>
      <h2>Other stuff</h2>
      Lorem ipsum,...
    </div>
  );
}

function Header() {
  React.useEffect(() => {
    console.log("render Header");
  });

  return (
    <header>
      <h1>My App</h1>
      <hr />
      <br />
    </header>
  );
}

function Footer() {
  React.useEffect(() => {
    console.log("render Footer");
  });

  return (
    <footer>
      <hr />
      Copyright &copy; Bouwe 2021
    </footer>
  );
}

function CounterStuff() {
  React.useEffect(() => {
    console.log("render CounterStuff");
  });

  return (
    <div>
      <h2>Counter</h2>
      <UpdateCounter />
    </div>
  );
}

function DisplayCounter() {
  React.useEffect(() => {
    console.log("render DisplayCounter");
  });

  const {
    state: { count }
  } = useCount();

  return <h1>{count}</h1>;
}

function UpdateCounter() {
  const { dispatch } = useCount();

  React.useEffect(() => {
    console.log("render UpdateCounter");
  });

  return (
    <>
      <button
        onClick={() => dispatch({ type: "decrement" })}
        style={{ width: "100px", height: "100px", fontSize: "80px" }}
      >
        -
      </button>
      <button
        onClick={() => dispatch({ type: "increment" })}
        style={{ width: "100px", height: "100px", fontSize: "80px" }}
      >
        +
      </button>
    </>
  );
}

const CountContext = React.createContext();

function countReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    case "reset": {
      return { count: 0 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function useCount() {
  const context = React.useContext(CountContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { CountProvider, useCount };
