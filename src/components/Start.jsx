import React from "react";

export default function Start(props) {
  return (
    <div className="start--container">
      <h1 className="start--title">Quizzical</h1>
      <h3 className="start--description">A quiz game made with React</h3>
      <button className="start--button" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  );
}
