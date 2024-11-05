import * as classes from "./App.module.css";

export const App = () => {
  console.log(classes);

  return (
    <div className="app">
      <header className="app-header">
        {/* <img src={logo} className="app-logo" alt="logo" /> */}
        <p className={classes.text}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 0000000000000000000000000000000000
        </a>
      </header>
    </div>
  );
};
