/* eslint-disable react/prop-types */
import React from "react";

function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  selectedAnswer,
}) {
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
