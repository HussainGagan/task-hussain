import { useQuiz } from "../context/quizContext";

function FinishScreen({ maxPossiblePoints }) {
  const { dispatch, points, highscore } = useQuiz();

  return (
    <>
      <p className="result">
        🎉 You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil((points / maxPossiblePoints) * 100)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
