import React from "react";
import { htmlDecode } from "../utils";

export default function Answer(props) {
  let className = "answer";
  if (props.quizIsFinished) {
    if (props.answer.answer === props.correctAnswer) {
      className += " correct";
    } else if (props.answer.isSelected) {
      className += " incorrect";
    }
  } else {
    if (props.answer.isSelected) {
      className += " selected";
    }
  }

  return (
    <div
      className={className}
      onClick={() => props.selectAnswer(props.questionId, props.answerId)}
    >
      {htmlDecode(props.answer.answer)}
    </div>
  );
}
