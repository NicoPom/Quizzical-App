import React from "react";
import { nanoid } from "nanoid";

import Question from "./components/Question.jsx";

export default function App() {
  const [start, setStart] = React.useState(false);
  const [quiz, setQuiz] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);

  const [quizCompleted, setQuizCompleted] = React.useState(() => false);
  const [quizIsFinished, setQuizIsFinished] = React.useState(() => false);
  const [score, setScore] = React.useState(0);

  const questionElements = quiz.map((quizItem) => {
    return (
      <Question
        questionId={quizItem.id}
        key={nanoid()}
        question={quizItem.question}
        answers={quizItem.answers}
        correctAnswer={quizItem.correctAnswer}
        selectAnswer={selectAnswer}
        quizIsFinished={quizIsFinished}
      />
    );
  });

  function startQuiz() {
    setStart(true);
  }

  React.useEffect(() => {
    if (start) {
      async function getQuizData() {
        try {
          const response = await fetch("https://opentdb.com/api.php?amount=5");
          const data = await response.json();
          const quizData = data.results.map((data) => {
            const answers = [
              ...data.incorrect_answers,
              data.correct_answer,
            ].map((answer) => {
              return {
                id: nanoid(),
                answer: answer,
                isSelected: false,
              };
            });

            return {
              id: nanoid(),
              question: data.question,
              answers: answers.sort(() => Math.random() - 0.5),
              correctAnswer: data.correct_answer,
            };
          });
          setQuiz(quizData);
        } catch (error) {
          console.log(error);
        }
      }

      getQuizData();
    }
  }, [start]);

  function selectAnswer(questionId, answerId) {
    setQuiz((prevQuiz) => {
      return prevQuiz.map((question) => {
        return {
          ...question,
          answers: question.answers.map((answer) => {
            if (answer.id === answerId && question.id === questionId) {
              return {
                ...answer,
                isSelected: !answer.isSelected,
              };
            }
            if (question.id === questionId) {
              return {
                ...answer,
                isSelected: false,
              };
            }
            return answer;
          }),
        };
      });
    });
  }

  // each time the quiz changes, check if all questions have been answered
  React.useEffect(() => {
    if (quiz.length > 0) {
      const allQuestionsAnswered = quiz.every((question) => {
        return question.answers.some((answer) => answer.isSelected);
      });

      if (allQuestionsAnswered) {
        setQuizCompleted(true);
        console.log("quiz completed");
      }
    }
  }, [quiz]);

  function calculateScore() {
    const score = quiz.reduce((score, question) => {
      const selectedAnswer = question.answers.find((answer) => {
        return answer.isSelected;
      });

      if (selectedAnswer.answer === question.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);

    setScore(score);
    setQuizIsFinished(true);
  }

  function playAgain() {
    setQuiz([]);
    setQuizCompleted(false);
    setQuizIsFinished(false);
    setScore(0);
    setStart(false);
  }

  return (
    <main className="app--container">
      {!start && (
        // START PAGE
        <section className="start--container">
          <h1 className="start--title">Quiz App</h1>
          <p className="start--description">A quiz app made with React.js</p>
          <button className="start--button" onClick={startQuiz}>
            Start Quiz
          </button>
        </section>
      )}
      {start && ( // QUIZ PAGE
        <section className="quiz--container">
          {questionElements}
          {quizCompleted && (
            <footer className="quiz--results">
              {quizIsFinished && (
                <p className="quiz--results__text">
                  You scored {score}/{quiz.length} correct answers
                </p>
              )}
              {quizCompleted && !quizIsFinished && (
                <button className="check--answers" onClick={calculateScore}>
                  Check Answers
                </button>
              )}
              {quizIsFinished && (
                <button className="play--again" onClick={playAgain}>
                  Play Again
                </button>
              )}
            </footer>
          )}
        </section>
      )}
    </main>
  );
}
