import React from "react";
import Question from "./Question";

export default function Quiz(props) {
  const quiz = props.quiz;
  const quizStatus = props.quizStatus;

  const quizElements = quiz.map((item) => (
    <Question
      key={item.id}
      id={item.id}
      question={item.question}
      answers={item.answers}
      correct={item.correct}
      quizIsFinished={quizStatus.finished}
      selectAnswer={props.selectAnswer}
      selected={item.selected}
    />
  ));

  return (
    <>
      <div className="quiz--container">
        {quizElements}
        <button className="quiz--check-button" onClick={props.checkAnswers}>
          {quizStatus.isFinished ? "Play Again" : "Check Answers"}
        </button>
      </div>
    </>
  );
}
