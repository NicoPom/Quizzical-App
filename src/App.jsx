import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";
import { htmlDecode } from "./utils.js";

export default function App() {
  const [start, setStart] = React.useState(false);
  const [quiz, setQuiz] = React.useState(() => []);
  const [quizStatus, setQuizStatus] = React.useState({
    isFinished: false,
    clickableAnswers: true,
    score: 0,
  });

  React.useEffect(() => {
    async function getQuizData() {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=2&category=9&difficulty=easy&type=multiple"
      );
      const data = await response.json();
      const quizData = data.results.map((item) => {
        const answers = [...item.incorrect_answers, item.correct_answer];
        return {
          id: nanoid(),
          question: htmlDecode(item.question),
          answers: answers.map((answer) => ({
            id: nanoid(),
            value: htmlDecode(answer),
            selected: false,
          })),
          correct: htmlDecode(item.correct_answer),
        };
      });
      setQuiz(quizData);
    }
    getQuizData();
  }, []);

  function startQuiz() {
    setStart(true);
  }

  function selectAnswer(id) {
    if (!quizStatus.clickableAnswers) return;
    const newQuiz = quiz.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          answers: item.answers.map((answer) => ({
            ...answer,
            selected: !answer.selected,
          })),
        };
      } else {
        return item;
      }
    });
    setQuiz(newQuiz);
  }

  return (
    <main className="app--container">
      {!start ? (
        <Start startQuiz={startQuiz} />
      ) : (
        <Quiz
          quiz={quiz}
          quizStatus={quizStatus}
          selectAnswer={selectAnswer}
          selected={quiz.selected}
        />
      )}
    </main>
  );
}
