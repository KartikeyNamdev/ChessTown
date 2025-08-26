import type WebSocket from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";
export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;
  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    console.log("Game assigned");
    // Tell p1 that game has started
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "White",
        },
      })
    );
    // Tell p2 that game has started
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "Black",
        },
      })
    );
  }

  public makeMoves(
    socket: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
    // Is this move by same user.
    const turn = this.board.turn(); // "w" or "b"
    if (turn === "w" && socket !== this.player1) return;
    if (turn === "b" && socket !== this.player2) return;

    try {
      // Validation
      // Is this move valid
      this.board.move(move);
      console.log(this.board.ascii());
    } catch (e) {
      // Invalid move
      console.log(e);
      return;
    }
    //Update the board/State is done by Chess.js

    //Check if the game is not ended

    if (this.board.isGameOver()) {
      //Send to both that game is over.
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      return;
    }
    // Send the Updated state to both the players.
    this.player1.send(JSON.stringify({ type: MOVE, payload: move }));
    this.player2.send(JSON.stringify({ type: MOVE, payload: move }));
  }
}
