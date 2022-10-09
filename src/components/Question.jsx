import React from "react";
import { nanoid } from "nanoid";
import { htmlDecode } from "../utils";
import Answer from "./Answer";

export default function Question(props) {
  const answerElements = props.answers.map((answer) => (
    <Answer
      key={nanoid()}
      questionId={props.questionId}
      answerId={answer.id}
      answer={answer}
      correctAnswer={props.correctAnswer}
      isSelected={answer.isSelected}
      selectAnswer={props.selectAnswer}
      quizIsFinished={props.quizIsFinished}
    />
  ));

  return (
    <div className="question--container">
      <h2 className="question--title">{htmlDecode(props.question)}</h2>
      <ul className="answers--list">{answerElements}</ul>
    </div>
  );
}
