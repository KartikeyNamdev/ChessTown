import WebSocket from "ws";
import { Game } from "./Game.js";
import { INIT_GAME, MOVE } from "./messages.js";
export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];
  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
    //Exit the game when user is deleted from users Array
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.type == INIT_GAME) {
        if (this.pendingUser) {
          // If pendingUser exists start the game
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          // If pendingUser doesn't exists add user to pendingUser
          this.pendingUser = socket;
        }
      }

      if (message.type == MOVE) {
        const game = this.games.find(
          (game) => game.player1 == socket || game.player2 == socket
        );
        if (game) {
          game.makeMoves(socket, message.payload.move);
        }
      }
    });
  }

  private handleMessage() {}
}
