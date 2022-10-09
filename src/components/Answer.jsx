import React from "react";
import { htmlDecode } from "../utils";

export default function Answer(props) {
  let className = "question--answer";
  if (props.selected) {
    className += " selected";
  }
  if (props.quizIsFinished) {
    if (props.answer === props.correctAnswer) {
      className += " correct";
    } else if (props.selected) {
      className += " incorrect";
    }
  }

  return (
    <div
      className={className}
      onClick={() => props.selectAnswer(props.answer.id)}
    >
      {htmlDecode(props.answer.answer)}
    </div>
  );
}
