import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager.js";

// Creates a WebSocketServer and initializes an instance of GameManager class, which holds in memory Game data.
const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();

//When WebSocketServer is making a connection using ws:websocket
wss.on("connection", function connection(ws) {
  gameManager.addUser(ws);
  console.log("WebSocketServer is making a connection using ws:websocket");

  ws.on("disconnect", () => {
    gameManager.removeUser(ws);
  });

  //   ws.on("message", function message(data) {
  //     console.log("received: %s", data);
  //   });

  ws.send("Connected");
});
