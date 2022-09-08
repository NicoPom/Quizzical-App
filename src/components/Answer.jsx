import React from "react";

export default function Answer(props) {
  let className = "question--answer";
  if (!props.quizStatus.isFinished) {
    if (props.selected) {
      className += " question--answer-selected";
    }
  } else {
    if (props.answer.value === props.correct) {
      className += " question--answer-correct";
    } else if (props.selected) {
      className += " question--answer-incorrect";
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
