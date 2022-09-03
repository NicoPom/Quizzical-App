import React from "react";
import { nanoid } from "nanoid";
import { htmlDecode } from "../utils";

export default function Question(props) {
  const answerElements = props.answers.map((answer) => (
    <div className="question--answer" key={nanoid()}>
      {htmlDecode(answer)}
    </div>
  ));
  console.log(props);

  return (
    <div className="question--container">
      <h2 className="question--title">{props.question}</h2>
      <div className="question--answers">{answerElements}</div>
    </div>
  );
}
