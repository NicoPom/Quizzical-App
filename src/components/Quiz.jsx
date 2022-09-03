import React from "react";
import { nanoid } from "nanoid";
import Question from "./Question";
import { htmlDecode } from "../utils";

export default function Quiz() {
  const [questions, setQuestions] = React.useState(() => []);

  React.useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
      );
      const data = await res.json();

      const questionArr = data.results.map((result) => ({
        id: nanoid(),
        question: htmlDecode(result.question),
        answers: [...result.incorrect_answers, result.correct_answer].sort(
          () => Math.random() - 0.5
        ),
      }));

      setQuestions(questionArr);
    }
    getQuestions();
  }, []);

  console.log(questions);

  const questionsElements = questions.map((question) => (
    <Question
      key={question.id}
      question={question.question}
      answers={question.answers}
      incorrect_answers={question.incorrect_answers}
    />
  ));

  return (
    <>
      <div className="quiz--container">
        {questionsElements}
        <button className="quiz--check-button">Check Answers</button>
      </div>
    </>
  );
}
