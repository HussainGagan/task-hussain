/* eslint-disable react/prop-types */
function Options({ question, dispatch, selectedAnswer }) {
  const hasAnswered = selectedAnswer != null;

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option  ${selectedAnswer === i ? "answer" : ""} ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
