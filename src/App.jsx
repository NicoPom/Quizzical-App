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
        const correct = item.correct_answer;
        const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
        const formattedAnswers = shuffledAnswers.map((answer) => {
          return {
            id: nanoid(),
            value: htmlDecode(answer),
            selected: false,
          };
        });
        return {
          key: nanoid(),
          question: htmlDecode(item.question),
          answers: formattedAnswers,
          correct: correct,
        };
      });
      setQuiz(quizData);
    }
    getQuizData();
  }, []);

  function startQuiz() {
    setStart(true);
    console.log("app", quiz);
  }

  function selectAnswer(id) {
    if (quizStatus.clickableAnswers) {
      setQuiz((prevQuiz) => {
        const updatedQuiz = prevQuiz.map((item) => {
          const updatedAnswers = item.answers.map((answer) => {
            if (answer.id === id) {
              return {
                ...answer,
                selected: true,
              };
            } else {
              return answer;
            }
          });
          return {
            ...item,
            answers: updatedAnswers,
          };
        });
        return updatedQuiz;
      });
    }
  }

  return (
    <main className="app--container">
      {!start ? (
        <Start startQuiz={startQuiz} />
      ) : (
        <Quiz quiz={quiz} quizStatus={quizStatus} selectAnswer={selectAnswer} />
      )}
    </main>
  );
}
