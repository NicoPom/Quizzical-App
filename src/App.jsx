import React from "react";
import { nanoid } from "nanoid";

import Question from "./components/Question.jsx";

export default function App() {
  const [start, setStart] = React.useState(false);
  const [quiz, setQuiz] = React.useState([]);
  const [quizCompleted, setQuizCompleted] = React.useState(() => false);
  const [quizIsFinished, setQuizIsFinished] = React.useState(() => false);

  const questionElements = quiz.map((quizItem) => {
    return (
      <Question
        key={nanoid()}
        question={quizItem.question}
        selectAnswer={selectAnswer}
        answers={quizItem.answers}
        correct={quizItem.correct}
        quizIsFinished={quizIsFinished}
      />
    );
  });

  React.useEffect(() => {
    if (start) {
      async function getQuizData() {
        const response = await fetch("https://opentdb.com/api.php?amount=5");
        const data = await response.json();
        const quizData = data.results.map((data) => {
          const answers = [...data.incorrect_answers, data.correct_answer].map(
            (answer) => {
              return {
                id: nanoid(),
                answer: answer,
                isSelected: false,
              };
            }
          );

          return {
            id: nanoid(),
            question: data.question,
            answers: answers,
            correctAnswer: data.correct_answer,
          };
        });

        setQuiz(quizData);
      }
      getQuizData();
    }
  }, [start]);

  function startQuiz() {
    setStart(true);
  }

  function selectAnswer(answer) {
    setQuiz((prev) => {
      const newQuiz = [...prev];
      const currentQuestion = newQuiz.find((data) => !data.selected);
      currentQuestion.selected = answer;
      return newQuiz;
    });
  }

  // React.useEffect(() => {
  //   async function getQuizData() {
  //     const response = await fetch(
  //       "https://opentdb.com/api.php?amount=2&category=9&difficulty=easy&type=multiple"
  //     );
  //     const data = await response.json();
  //     const quizData = data.results.map((data) => {
  //       const answers = [...data.incorrect_answers, data.correct_answer];
  //       const correct = data.correct_answer;
  //       const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
  //       const formattedAnswers = shuffledAnswers.map((answer) => {
  //         return {
  //           id: nanoid(),
  //           value: answer),
  //           selected: false,
  //         };
  //       });
  //       return {
  //         key: nanoid(),
  //         question: data.question),
  //         answers: formattedAnswers,
  //         correct: correct,
  //       };
  //     });
  //     setQuiz(quizData);
  //   }
  //   getQuizData();
  // }, []);

  // function startQuiz() {
  //   setStart(true);
  // }

  // function selectAnswer(id) {
  //   if (quizStatus.clickableAnswers) {
  //     const newQuiz = quiz.map((question) => {
  //       const newAnswers = question.answers.map((answer) => {
  //         if (answer.id === id) {
  //           return {
  //             ...answer,
  //             selected: true,
  //           };
  //         } else {
  //           return answer;
  //         }
  //       });
  //       return {
  //         ...question,
  //         answers: newAnswers,
  //       };
  //     });
  //     setQuiz(newQuiz);
  //   }
  // }

  // function calculateScore() {
  //   const score = quiz.reduce((total, question) => {
  //     const correctAnswer = question.answers.find(
  //       (answer) => answer.value === question.correct
  //     );
  //     if (correctAnswer.selected) {
  //       return total + 1;
  //     } else {
  //       return total;
  //     }
  //   }, 0);
  //   setQuizStatus({
  //     ...quizStatus,
  //     score: score,
  //   });
  // }

  // function restartQuiz() {
  //   setQuizStatus({
  //     isFinished: false,
  //     clickableAnswers: true,
  //     score: 0,
  //   });
  //   setStart(false);
  // }

  return (
    <main className="app--container">
      {!start ? (
        // START PAGE
        <section className="start--container">
          <h1 className="start--title">Quiz App</h1>
          <p className="start--description">A quiz app made with React.js</p>
          <button className="start--button" onClick={startQuiz}>
            Start Quiz
          </button>
        </section>
      ) : (
        // QUIZ PAGE
        <section className="quiz--container">
          {questionElements}
          {quizCompleted ? (
            <footer className="quiz--results">
              {quizIsFinished ? (
                <p className="quiz--results__text">
                  You scored {quizStatus.score}/{quiz.length} correct answers
                </p>
              ) : (
                <button className="check--answers" onClick={calculateScore}>
                  Check Answers
                </button>
              )}
              ) :
              <button className="play--again" onClick={playAgain}>
                Play Again
              </button>
            </footer>
          ) : null}
        </section>
      )}
    </main>
  );
}
