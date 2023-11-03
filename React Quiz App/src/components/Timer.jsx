/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useQuiz } from "../context/quizContext";

function Timer() {
  const { secondsRemaining, dispatch } = useQuiz();

  const minute = Math.trunc(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "updateTimer" }), 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {minute < 10 ? `0${minute}` : minute}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
