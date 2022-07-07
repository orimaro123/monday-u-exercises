import "./App.css";
//import ErrorBoundary from "./components/ErrorBoundary"

import AppContainerConnector from "./components/AppContainerConnector";

import React from "react";

function App() {
  return (
    <div className="App">
     {/*  <ErrorBoundary> */}
        <AppContainerConnector />
     {/*  </ErrorBoundary> */}
    </div>
  );
}

export default App;
