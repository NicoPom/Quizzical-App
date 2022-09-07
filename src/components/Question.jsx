import React from "react";
import { nanoid } from "nanoid";
import Answer from "./Answer";

export default function Question(props) {
  const answerElements = props.answers.map((answer) => (
    <Answer
      key={nanoid()}
      value={answer.answer}
      correct={answer.correct}
      selected={answer.selected}
      selectAnswer={() => props.selectAnswer(answer.id)}
    />
  ));

  return (
    <div className="question--container">
      <h2 className="question--title">{props.question}</h2>
      <div className="question--answers">{answerElements}</div>
    </div>
  );
}
