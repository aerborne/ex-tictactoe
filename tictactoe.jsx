import "./styles.css";
import { useState } from "react";

// what I need
//  1. board 2. squares 3. calculate win
// set onclick per box

export default function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

const Board = () => {
  const [squares, setSquares] = useState([]);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const onClickSquare = (index) => {
    const value = isXNext ? "X" : "O";
    setIsXNext(!isXNext);
    const newSquares = squares;
    newSquares[index] = value;
    setSquares(newSquares);
    calculateWinner();
  };

  const calculateWinner = () => {
    const linesToWin = [
      // horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal
      [0, 4, 8],
      [2, 4, 6]
    ];

    const winner = linesToWin.reduce((prev, value) => {
      const [a, b, c] = value;
      if (
        !!squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }

      return prev;
    }, "");

    console.log({ winner });

    if (!winner) {
      return;
    }

    return setWinner(winner);
  };
  return (
    <div className="board">
      <div className="square-row">
        <Square value={squares[0]} onClick={() => onClickSquare(0)} />
        <Square value={squares[1]} onClick={() => onClickSquare(1)} />
        <Square value={squares[2]} onClick={() => onClickSquare(2)} />
      </div>
      <div className="square-row">
        <Square value={squares[3]} onClick={() => onClickSquare(3)} />
        <Square value={squares[4]} onClick={() => onClickSquare(4)} />
        <Square value={squares[5]} onClick={() => onClickSquare(5)} />
      </div>
      <div className="square-row">
        <Square value={squares[6]} onClick={() => onClickSquare(6)} />
        <Square value={squares[7]} onClick={() => onClickSquare(7)} />
        <Square value={squares[8]} onClick={() => onClickSquare(8)} />
      </div>

      <button
        onClick={() => {
          setSquares([]);
          setIsXNext(true);
          setWinner(undefined);
        }}
      >
        Reset
      </button>

      {winner && `Winner is ${winner}`}
    </div>
  );
};

const Square = ({ value, onClick }) => {
  return (
    <button disabled={value} className="square" onClick={onClick}>
      {value}
    </button>
  );
};
