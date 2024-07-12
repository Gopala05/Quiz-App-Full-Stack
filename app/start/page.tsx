"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { message, Row, Col, Button, Card, Input } from "antd";
import Sidebar from "@/components/custom/Sidebar";
import PostNav from "@/components/custom/PostNav";
import Quiz from "@/components/custom/Quiz";
import toast from "react-hot-toast";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const StartQuiz: React.FC = () => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString ? userString : "");

  const [title, setTitle] = useState<string>("");
  const [start, setStart] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [time, setTime] = useState<number>(0);
  const [marks, setMarks] = useState<number>(0);

  const handleCheck = async () => {
    try {
      const payload = {
        title: title,
        username: user.username,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/check-attempt`,
        payload
      );

      if (response.status === 200) {
        fetchQuiz();
      } else {
        toast.error(response.data.message || "Failed to check Quiz attempt");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error Checking quiz Attempt: ", error);
    }
  };

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/quiz?title=${title}`
      );

      if (response.status === 200) {
        const quizData: any = response.data.details[0];

        const fetchedQuestions: Question[] = await Promise.all(
          quizData.questions.map(async (question: string, index: number) => ({
            question: question,
            answers: quizData.options[index].map(
              (option: { option: string }) => option.option
            ),
            correctAnswer: quizData.correct_option[index],
          }))
        );

        setQuestions(fetchedQuestions);
        setMarks(quizData.marks_per_question);
        setTime(quizData.timer_seconds);
        setStart(true);
      } else {
        setStart(false);
        toast.error(response.data.message || "Failed to fetch quiz");
      }
    } catch (error: any) {
      setStart(false);
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error fetching quiz: ", error);
    }
  };

  return (
    <div className="h-[100vh] bg-white lg:overflow-hidden">
      <Row>
        <Col lg={4}>
          <Sidebar />
        </Col>
        <Col lg={20}>
          <PostNav path="Start Quiz" />
          <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
            {!start && (
              <Row className="flex justify-center items-center h-[80vh] w-full">
                <Col span={8}>
                  <Card className="flex-grow flex-col border-none bg-gradient-to-r from-green-400 to-green-600 flex justify-start text-3xl font-bold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-green-600 hover:-translate-y-2">
                    <h2 className="text-3xl font-bold mb-4 text-center">
                      Test your Knowledge
                    </h2>
                    <h2 className="text-xl font-bold mt-8">
                      Title of the Quiz <span className="text-red-700">*</span>{" "}
                    </h2>
                    <Input
                      type="text"
                      placeholder="Enter the title of the Quiz"
                      value={title || ""}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mb-4"
                    />
                    <h2 className="text-xl font-bold mt-5">Quiz participant</h2>
                    <Input
                      type="text"
                      placeholder="Enter the title of the Quiz"
                      value={user.name}
                      disabled={true}
                      className="mb-4 font-bold text-black disabled:text-black disabled:bg-white"
                    />

                    <div className="flex justify-center">
                      <Button
                        className="flex justify-center disabled:bg-blue-950 disabled:text-white items-center font-semibold text-2xl p-5 text-black border-none bg-blue-400 mt-5"
                        type="primary"
                        onClick={handleCheck}
                        disabled={title == ""}
                      >
                        Start
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            )}
            {start && questions.length > 0 && (
              <Quiz
                title={title}
                questions={questions}
                time={time}
                marks={marks}
                userName={user.username}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StartQuiz;
