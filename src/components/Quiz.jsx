import React from "react";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function Quiz() {
  const [questions, setQuestions] = React.useState(() => []);

  React.useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
      );
      const data = await res.json();
      data.results.map((result) => {
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          {
            id: nanoid(),
            question: result.question,
            answer: result.correct_answer,
            incorrect_answers: result.incorrect_answers,
          },
        ]);
      });
    }
    getQuestions();
  }, []);

  console.log(questions);

  const questionsElements = questions.map((question) => (
    <Question
      key={question.id}
      question={question.question}
      answer={question.answer}
      incorrect_answers={question.incorrect_answers}
    />
  ));

  return <div className="quiz--container">{questionsElements}</div>;
}
