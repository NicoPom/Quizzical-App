import React from "react";

export default function Answer(props) {
  const styles = {
    outline: props.selected
      ? "0.8px solid var(--light-blue)"
      : "0.8px solid var(--main-button)",
    backgroundColor: props.selected ? "var(--light-blue)" : "",
  };
  return (
    <div
      className="question--answer"
      style={styles}
      onClick={props.selectAnswer}
    >
      {props.value}
    </div>
  );
}
