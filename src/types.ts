// shared between client and mediator
export interface WSMessage {
  messageType: "scoreUpdate";
  data: WSMessageData; // TODO: should make a different WSMessageData for each messageType.
}

// shared between client and mediator
export interface WSMessageData {
  score: number;
}
