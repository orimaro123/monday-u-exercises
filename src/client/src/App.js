import "./App.css";
import AppContainer from "./components/AppContainer";
import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("")
  return (
    <div className="App">
      <header>
        <h1 className="appName">Ori's Todo List</h1>
      </header>

      <AppContainer />
    </div>
  );
}

export default App;
