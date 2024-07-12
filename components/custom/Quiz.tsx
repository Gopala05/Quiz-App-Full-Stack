"use client";
import { useState, useEffect } from "react";
import StatCard from "./StatCard";
import { Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

interface QuizProps {
  title: string;
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  time: number;
  marks: number;
  userName: string | undefined;
}

const Quiz = ({ title, questions, time, marks, userName }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(time);
  const [timerRunning, setTimerRunning] = useState(false);

  const { question, answers, correctAnswer } = questions[activeQuestion];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(time);
  };

  const handleTimeUp = () => {
    stopTimer();
    resetTimer();
    activeQuestion !== questions.length - 1 ? nextQuestion() : null;
  };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  const onAnswerSelected = (answer: string, idx: number) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer("");
    }
  };

  const nextQuestion = async () => {
    setSelectedAnswerIndex(null);
    setResults((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + marks,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      stopTimer();
      handleResults();
    }
    setChecked(false);
    resetTimer();
    startTimer();
  };

  const handleResults = async () => {
    try {
      const payload = {
        title: title,
        marks_scored: results.score + (selectedAnswer ? marks : 0),
        maximum_score: questions.length * marks,
        username: userName,
        correct: results.correctAnswers + (selectedAnswer ? 1 : 0),
        wrong: results.wrongAnswers + (selectedAnswer ? 0 : 1),
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/score`,
        payload
      );
      if (response.status == 201) {
        toast.success(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in Storing Results: ", error);
    }
  };

  return (
    <div className="min-h-[500px]">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-10 items-center">
              <div className="bg-primary text-white px-4 rounded-md py-1">
                <h2>
                  Question: {activeQuestion + 1}
                  <span>/{questions.length}</span>
                </h2>
              </div>

              <div className="bg-primary text-white px-4 rounded-md py-1">
                {timeRemaining} seconds to answer
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-2xl font-bold text-black">{question}</h3>
              <ol className="list-none">
                {answers.map((answer: string, idx: number) => (
                  <li
                    key={idx}
                    onClick={() => onAnswerSelected(answer, idx)}
                    className={`cursor-pointer mb-5 py-3 text-black rounded-md hover:bg-primary hover:text-white px-3
                      ${selectedAnswerIndex === idx && "bg-primary text-white"}
                      `}
                  >
                    <span>
                      {String.fromCharCode(97 + idx)}. {answer}
                    </span>
                  </li>
                ))}
              </ol>
              <button
                onClick={nextQuestion}
                disabled={!checked}
                className="font-bold text-black"
              >
                {activeQuestion === questions.length - 1
                  ? "Finish"
                  : "Next Question →"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl uppercase mb-10 text-black">Results 📈</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              <StatCard
                title="Percentage"
                value={`${(results.score / (questions.length * marks)) * 100}%`}
              />
              <StatCard title="Total Questions" value={questions.length} />
              <StatCard title="Total Score" value={results.score} />
              <StatCard
                title="Correct Answers"
                value={results.correctAnswers}
              />
              <StatCard title="Wrong Answers" value={results.wrongAnswers} />
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="flex mt-5 justify-center py-8 disabled:bg-blue-950 disabled:text-white items-center font-semibold text-2xl p-5 text-black border-none bg-blue-400"
                type="primary"
                onClick={() => window.location.reload()}
              >
                Take another Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
