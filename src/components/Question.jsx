import React from "react";

export default function Question(props) {
  const incorrectAnswers = props.incorrect_answers.map((answer) => (
    <div className="question--answer incorrect">{answer}</div>
  ));
  return (
    <div className="question--container">
      <h2 className="question--title">{props.question}</h2>
      <div className="question--answers">
        <div className="question--answer correct">{props.answer}</div>
        {incorrectAnswers}
      </div>
    </div>
  );
}
