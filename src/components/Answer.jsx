import React from "react";
import { htmlDecode } from "../utils";

export default function Answer(props) {
  const className = "answer" + (props.isSelected ? " selected" : "");

  return (
    <div
      className={className}
      onClick={() => props.selectAnswer(props.questionId, props.answerId)}
    >
      {htmlDecode(props.answer.answer)}
    </div>
  );
}
