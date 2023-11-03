import { useQuiz } from "../context/quizContext";

/* eslint-disable react/prop-types */
function StartScreen() {
  const { numQuestions, dispatch: onStart } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => onStart({ type: "quizStart" })}
      >
        Let&apos;s start
      </button>
    </div>
  );
}

export default StartScreen;
