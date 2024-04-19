import { useState, useEffect } from "react";
import { WSMessage } from "../types";

interface IGameState {
  score: number;
  prevScore: number;
}

const DEFAULT_GAME_STATE: IGameState = {
  score: 0,
  prevScore: 0,
};

function useMediator(wsURL: string, clientId: string) {
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [gameState, setGameState] = useState<IGameState>(DEFAULT_GAME_STATE);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const wsServerURL = `${wsURL}?clientId=${clientId}`;
    console.log(wsServerURL);
    const ws = new WebSocket(wsServerURL);

    ws.onopen = function (this: WebSocket, ev: Event) {
      setIsWsConnected(true);
      setErrorMessage("");
    };

    ws.onmessage = (event: MessageEvent) => {
      // ignore this automatic connected message.
      if (event.data === "connected") {
        return;
      }

      // parse the stringified message to JSON.
      const wsMessage: WSMessage = JSON.parse(event.data);

      // Process the message from the server
      switch (wsMessage.messageType) {
        case "scoreUpdate":
          setGameState((prev) => {
            return { ...prev, prevScore: prev.score, score: wsMessage.data.score };
          });
          break;
        default:
          break;
      }
    };

    ws.onclose = (event) => {
      console.log(`WS Disconnected with code ${event.code}. \nReason: ${event.reason}`);
      setErrorMessage(event.reason);
      setIsWsConnected(false);
      setGameState((prev) => {
        return { ...prev, score: 0, prevScore: 0 };
      });
    };

    return () => {
      ws.close();
    };
  }, [clientId]);

  return { isConnected: isWsConnected, gameState, errorMessage };
}

export default useMediator;
