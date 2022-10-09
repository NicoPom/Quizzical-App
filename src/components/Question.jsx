import React from "react";
import { nanoid } from "nanoid";
import { htmlDecode } from "../utils";
import Answer from "./Answer";

export default function Question(props) {
  const answerElements = props.answers.map((answer) => (
    <Answer
      key={nanoid()}
      answer={answer}
      selectAnswer={props.selectAnswer}
      correct={props.correct}
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
