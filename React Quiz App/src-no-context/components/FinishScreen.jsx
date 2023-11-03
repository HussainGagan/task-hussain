function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
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
