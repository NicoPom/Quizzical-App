import React from "react";
import { nanoid } from "nanoid";
import Answer from "./Answer";

export default function Question(props) {
  const answers = props.answers;
  const answerElements = answers.map((answer) => (
    <Answer
      key={nanoid()}
      answer={answer}
      correct={props.correct}
      quizIsFinished={props.quizIsFinished}
      selectAnswer={props.selectAnswer}
      selected={answer.selected}
    />
  ));

  return (
    <div className="question--container">
      <h2 className="question--title">{props.question}</h2>
      <div className="question--answers">{answerElements}</div>
    </div>
  );
}
