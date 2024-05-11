import { useState, useEffect } from "react";
import { WSMessage } from "../types";
import { useDispatch } from "react-redux";
import { resetScore, setScore } from "../state/slices/GameSlice";

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
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

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
          dispatch(setScore(wsMessage.data.score));
          break;
        default:
          break;
      }
    };

    ws.onclose = (event) => {
      console.log(`WS Disconnected with code ${event.code}. \nReason: ${event.reason}`);
      setErrorMessage(event.reason);
      setIsWsConnected(false);
      dispatch(resetScore());
    };

    return () => {
      ws.close();
    };
  }, [clientId]);

  return { isConnected: isWsConnected, errorMessage };
}

export default useMediator;
