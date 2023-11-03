/* eslint-disable react/prop-types */
import React from "react";
import { useQuiz } from "../context/quizContext";

function Progress({ numQuestions, maxPossiblePoints }) {
  const { index, points, selectedAnswer } = useQuiz();

  return (
    <div className="progress">
      <progress
        max={numQuestions}
        value={index + Number(selectedAnswer !== null)}
      />

      <p>
        Question{" "}
        <strong>
          {index + 1} / {numQuestions}
        </strong>
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </div>
  );
}

export default Progress;
