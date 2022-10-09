import React from "react";

export default function Answer(props) {
  let className = "question--answer";
  if (props.selected) {
    className += " selected";
  }
  if (props.quizStatus.isFinished) {
    if (props.answer.value === props.correct) {
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
      {props.answer.value}
    </div>
  );
}
