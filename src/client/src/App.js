import "./App.css";

import AppContainerConnector from "./components/AppContainer/AppContainerConnector";
import { ErrorBoundary } from "./components/ErrorBoundary";
import React from "react";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <AppContainerConnector />
      </ErrorBoundary>
    </div>
  );
}

export default App;
