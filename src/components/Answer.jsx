import React from "react";

export default function Answer(props) {
  const answer = props.answer;
  let className = "question--answer";
  // if quiz is finished, show the correct answer and the user's answer
  if (props.quizIsFinished) {
    if (props.correct) {
      className += " correct";
    } else if (answer.selected) {
      className += " incorrect";
    }
  } else if (answer.selected) {
    className += " selected";
  }

  return (
    <div className={className} onClick={() => props.selectAnswer(answer.id)}>
      {answer.value}
    </div>
  );
}
