import React from "react";
import Question from "./Question";

export default function Quiz(props) {
  const quizElements = props.quiz.map((question) => (
    <Question
      key={question.key}
      question={question.question}
      answers={question.answers}
      correct={question.correct}
      selectAnswer={props.selectAnswer}
      quizStatus={props.quizStatus}
    />
  ));

  return (
    <>
      <div className="quiz--container">
        {quizElements}
        <button className="quiz--check-button" onClick={props.checkAnswers}>
          {props.quizStatus.isFinished ? "Play Again" : "Check Answers"}
        </button>
      </div>
    </>
  );
}
