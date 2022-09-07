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
            selected: false,
            id: nanoid(),
          }))
          .concat({
            answer: htmlDecode(result.correct_answer),
            correct: true,
            selected: false,
            id: nanoid(),
          })
          .sort(() => Math.random() - 0.5), // Randomize the order of the answers
      }));
      setQuiz(quizArr);
    }
    getQuizData();
  }, []);

  function selectAnswer(id) {
    const newQuiz = quiz.map((question) => {
      if (question.answers.some((answer) => answer.id === id)) {
        //
        return {
          ...question,
          answers: question.answers.map((answer) => ({
            ...answer,
            selected: answer.id === id,
          })),
        };
      } else {
        return question;
      }
    });
    setQuiz(newQuiz);
  }

  const quizElements = quiz.map((item) => (
    <Question
      key={item.id}
      question={item.question}
      answers={item.answers}
      selectAnswer={selectAnswer}
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
