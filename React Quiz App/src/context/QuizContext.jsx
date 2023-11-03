/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  selectedAnswer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataFetched":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "quizStart":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        selectedAnswer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        selectedAnswer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "updateTimer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 1 ? "finished" : state.status,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
  }
};

function QuizContextProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      selectedAnswer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        selectedAnswer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz Context was accessed outside the provider");
  return context;
}

export { QuizContextProvider, useQuiz };
