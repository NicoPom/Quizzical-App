import React from "react";
import { nanoid } from "nanoid";
import Question from "./Question";
import { htmlDecode } from "../utils";

export default function Quiz() {
  const [quiz, setQuiz] = React.useState(() => []);

  React.useEffect(() => {
    async function getQuizData() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
      );
      const data = await res.json();

      const quizArr = data.results.map((result) => ({
        id: nanoid(),
        question: htmlDecode(result.question),
        answers: result.incorrect_answers
          .map((answer) => ({
            answer: htmlDecode(answer),
            correct: false,
          }))
          .concat({
            answer: htmlDecode(result.correct_answer),
            correct: true,
          })
          .sort(() => Math.random() - 0.5),
      }));

      setQuiz(quizArr);
    }
    getQuizData();
  }, []);

  const quizElements = quiz.map((question) => (
    <Question
      key={question.id}
      question={question.question}
      answers={question.answers}
    />
  ));

  return (
    <>
      <div className="quiz--container">
        {quizElements}
        <button className="quiz--check-button">Check Answers</button>
      </div>
    </>
  );
}
