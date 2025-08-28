import type { Color, PieceSymbol, Square } from "chess.js";

type ChessBoardProps = {
  board: ({ square: Square; type: PieceSymbol; color: Color } | null)[];
};

export const ChessBoard = ({ board }: ChessBoardProps) => {
  console.log(board);
  return <div className=" bg-green-400">ChessBoard</div>;
};
