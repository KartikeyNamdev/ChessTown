import { useEffect, useState } from "react";
import { ChessBoard } from "./components/ChessBoard";
import { Chess } from "chess.js";
import { useSocket } from "./hooks/useSocket";
import { GAME_OVER, INIT_GAME, MOVE } from "./hooks/messageTypes";
export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  // ({ square: Square; type: PieceSymbol; color: Color; } | null)[][]

  useEffect(() => {
    if (!socket) {
      return;
    } else {
      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        switch (msg.type) {
          case INIT_GAME:
            setChess(new Chess());
            setBoard(chess.board());
            console.log("Game initialized");
            break;
          case MOVE: {
            const move = msg.payload;
            chess.move(move);
            setBoard(chess.board());
            console.log("Move Made....");
            break;
          }
          case GAME_OVER:
            console.log("Game Over");
            break;
        }
      };
    }
  }, [socket, chess, board]);

  if (!socket) {
    return <div>Connecting......</div>;
  }

  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-xl max-h-screen w-full">
        <div className="grid grid-cols-6 max-h-screen gap-4 max-w-screen">
          <div className="col-span-4">
            <ChessBoard board={board.flat()} />
          </div>
          <div className="text-white col-span-2 bg-violet-400"> Buttons </div>
        </div>
      </div>
    </div>
  );
};
