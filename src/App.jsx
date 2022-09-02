import React from "react";
import Start from "./components/Start";

export default function App() {
  const [start, setStart] = React.useState(true);

  function startQuiz() {
    setStart(true);
  }

  return (
    <main className="app--container">
      {!start ? <Start startQuiz={startQuiz} /> : <Quiz />}
    </main>
  );
}