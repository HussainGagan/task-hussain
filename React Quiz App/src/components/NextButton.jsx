/* eslint-disable react/prop-types */
import React from "react";
import { useQuiz } from "../context/quizContext";

function NextButton({ index, numQuestions }) {
  const { dispatch } = useQuiz();

  function handleClick() {
    if (index === numQuestions - 1) {
      dispatch({ type: "finish" });
      return;
    }

    dispatch({ type: "nextQuestion" });
  }

  return (
    <div>
      <button onClick={handleClick} className="btn btn-ui">
        {index === numQuestions - 1 ? "Finsih" : "Next"}
      </button>
    </div>
  );
}

export default NextButton;
