import React, { useState } from "react";
import ScoreBoard from "./components/score-board/score-board";
import useMediator from "./hooks/useMediator";
import classnames from "classnames";
// import logo from "./logo.svg";
import TextInput from "./components/text-input/text-input";


import "./App.css";

function App() {
  const [clientId, setClientId] = useState("");
  const { isConnected, gameState, errorMessage } = useMediator("ws://localhost:8080", clientId);

  const color = gameState.score > gameState.prevScore ? "green" : gameState.score < gameState.prevScore ? "red" : "gray";

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className={classnames("App-logo", isConnected ? "animation-active" : "")} alt="logo" /> */}
        <TextInput
          label="Client ID"
          value={clientId}
          onChange={(e) => {
            setClientId(e.target.value);
          }}
          message={errorMessage}
        />
        <ScoreBoard title={"Score"} score={gameState.score} color={color} />
        <div className={classnames("status", isConnected ? "connected" : "disconnected")}>{isConnected ? "connected" : "disconnected"}</div>
      </header>
    </div>
  );
}

export default App;
