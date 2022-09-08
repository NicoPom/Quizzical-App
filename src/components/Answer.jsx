import React from "react";

export default function Answer(props) {
  let className = "question--answer";
  if (props.selected) {
    className += " selected";
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
