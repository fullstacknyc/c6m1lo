"use client";

import { useState } from "react";

type Choice = "rock" | "paper" | "scissors" | null;
type Result = "win" | "lose" | "tie" | null;

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameHistory, setGameHistory] = useState<string[]>([]);

  const choices: Choice[] = ["rock", "paper", "scissors"];

  const getComputerChoice = (): Choice => {
    return choices[Math.floor(Math.random() * 3)];
  };

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return "tie";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "win";
    }
    return "lose";
  };

  const playGame = (choice: Choice) => {
    const computer = getComputerChoice();
    const gameResult = determineWinner(choice, computer);

    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(gameResult);

    if (gameResult) {
      const newHistory = `You: ${choice} vs Computer: ${computer} - ${gameResult.toUpperCase()}`;
      setGameHistory([newHistory, ...gameHistory.slice(0, 9)]);

      if (gameResult === "win") {
        setPlayerScore(playerScore + 1);
      } else if (gameResult === "lose") {
        setComputerScore(computerScore + 1);
      }
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerScore(0);
    setComputerScore(0);
    setGameHistory([]);
  };

  const getResultColor = () => {
    if (result === "win") return "text-green-500";
    if (result === "lose") return "text-red-500";
    return "text-yellow-500";
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-20">
      <h1 className="text-4xl font-bold mb-2">Rock, Paper, Scissors</h1>
      <p className="text-gray-600 mb-8">Beat the computer and climb the scoreboard!</p>

      {/* Score Board */}
      <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-100 p-6 rounded-lg">
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-1">Your Score</p>
          <p className="text-3xl font-bold text-blue-600">{playerScore}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-1">Computer Score</p>
          <p className="text-3xl font-bold text-purple-600">{computerScore}</p>
        </div>
      </div>

      {/* Game Choices */}
      <div className="mb-8">
        <p className="text-gray-700 font-semibold mb-4">Make your choice:</p>
        <div className="grid grid-cols-3 gap-4">
          {choices.map((choice) => (
            choice && (
              <button
                key={choice}
                onClick={() => playGame(choice as Choice)}
                className="p-6 bg-linear-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold text-lg transition transform hover:scale-105 active:scale-95"
              >
                {choice.charAt(0).toUpperCase() + choice.slice(1)}
              </button>
            )
          ))}
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Your Choice</p>
              <p className="text-2xl font-bold capitalize">{playerChoice}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Computer Choice</p>
              <p className="text-2xl font-bold capitalize">{computerChoice}</p>
            </div>
          </div>
          <div className="text-center">
            <p className={`text-2xl font-bold ${getResultColor()}`}>
              {result === "win" && "🎉 You Win!"}
              {result === "lose" && "💻 Computer Wins!"}
              {result === "tie" && "🤝 It's a Tie!"}
            </p>
          </div>
        </div>
      )}

      {/* Game History */}
      {gameHistory.length > 0 && (
        <div className="mb-8">
          <p className="text-gray-700 font-semibold mb-4">Recent Games:</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {gameHistory.map((game, index) => (
              <div key={index} className="p-3 bg-gray-100 rounded text-sm text-gray-700">
                {game}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
      >
        Reset Game
      </button>
    </div>
  );
};

export default Game;