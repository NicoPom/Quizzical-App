import React from "react";
import { nanoid } from "nanoid";
import Answer from "./Answer";

export default function Question(props) {
  const answerElements = props.answers.map((answer) => (
    <Answer
      key={nanoid()}
      answer={answer}
      correct={props.correct}
      selectAnswer={props.selectAnswer}
      selected={answer.selected}
      quizStatus={props.quizStatus}
    />
  ));
  console.log("question", props);

  return (
    <div className="question--container">
      <h2 className="question--title">{props.question}</h2>
      <div className="question--answers">{answerElements}</div>
    </div>
  );
}
