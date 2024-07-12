"use client";
import React, { useState } from "react";
import Sidebar from "@/components/custom/Sidebar";
import { Card, Col, Row, Input, Button, Select } from "antd";
import PostNav from "@/components/custom/PostNav";
import axios from "axios";
import toast from "react-hot-toast";

const { Option } = Select;

const CreateQuiz = () => {
  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [numQuestions, setNumQuestions] = useState<number>(0);
  const [marks, setMarks] = useState<number>(0);
  const [numOptions, setNumOptions] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [enable, setEnable] = useState<boolean>(false);
  const [questions, setQuestions] = useState<
    { question: string; options: string[]; correct: string }[]
  >([]);

  const handleMarksPerQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMarks(value);
  };

  const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNumQuestions(value);
  };

  const handleNumOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNumOptions(value);
  };

  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setTime(value);
  };

  const initializeQuestions = () => {
    const initialQuestions = Array.from({ length: numQuestions }, () => ({
      question: "",
      options: Array.from({ length: numOptions }, () => ""),
      correct: "",
    }));
    setQuestions(initialQuestions);
  };

  const handleQuestionChange = (qIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    setEnable(true);
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (qIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correct = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title: title,
        no_of_questions: numQuestions,
        marks_per_question: marks,
        no_of_choices: numOptions,
        options: questions.map(({ options }) =>
          options.map((option) => ({ option }))
        ),
        questions: questions.map(({ question }) => question),
        timer_seconds: time,
        correct_option: questions.map(({ correct }) => correct),
      };

      const response: any = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/create`,
        payload
      );

      if (response.status == 201) {
        toast.success("Quiz Created Successfully!");
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in Creating Quiz: ", error);
    }
  };

  const handleReview = () => {
    setStep(3);
  };

  const handleEdit = () => {
    setStep(2);
  };

  const handleStart = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/check-title?title=${title}`
      );
      if (response.status === 200) {
        initializeQuestions();
        marks > 0 ? "" : setMarks(1);
        time > 0 ? "" : setTime(5);
        setStep(2);
      } else {
        toast.error(response.data.message || "Failed to get Quiz Records");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error getting quiz results: ", error);
    }
  };

  const handleBack = () => {
    setNumQuestions(0);
    setNumOptions(0);
    setQuestions([]);
    setStep(1);
    setTime(0);
    setTitle("");
    setMarks(0);
  };

  const isReviewButtonDisabled = () => {
    return questions.some(
      (q) => !q.question || q.options.some((opt) => !opt) || !q.correct
    );
  };

  return (
    <div className="h-[100vh] bg-white lg:overflow-hidden">
      <Row>
        <Col lg={4}>
          <Sidebar />
        </Col>
        <Col lg={20}>
          <PostNav path="Create Quiz" />
          {step === 1 && (
            <Row className="p-10 flex justify-center items-center h-[90vh] w-full">
              <Col span={8}>
                <Card className="flex-grow flex-col border-none bg-gradient-to-r from-red-400 to-red-600 flex justify-start text-3xl font-bold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-red-600 hover:-translate-y-2">
                  <h2 className="text-3xl font-bold mb-4 text-center">
                    About the Quiz
                  </h2>
                  <h2 className="text-xl font-bold mt-8">
                    Title of the Quiz <span className="text-white">*</span>{" "}
                  </h2>
                  <Input
                    type="text"
                    placeholder="Enter the title of the Quiz"
                    value={title || ""}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4"
                  />

                  <h2 className="text-xl font-bold mt-5">
                    Number of Questions <span className="text-white">*</span>
                  </h2>
                  <Input
                    type="number"
                    placeholder="Enter number of questions"
                    value={numQuestions || ""}
                    onChange={handleNumQuestionsChange}
                    className="mb-4"
                  />

                  <h2 className="text-xl font-bold mt-5">Marks per Question</h2>
                  <Input
                    type="number"
                    placeholder="Enter the marks per question"
                    value={marks || ""}
                    onChange={handleMarksPerQuestion}
                    className="mb-4"
                  />

                  <h2 className="text-xl font-bold mt-5">
                    Number of Options per Question{" "}
                    <span className="text-white">*</span>
                  </h2>
                  <Input
                    type="number"
                    placeholder="Enter number of options"
                    value={numOptions || ""}
                    onChange={handleNumOptionsChange}
                    className="mb-4"
                  />

                  <h2 className="text-xl font-bold mt-5">
                    Time Per Question (sec)
                  </h2>
                  <Input
                    type="number"
                    placeholder="Enter time per Question"
                    value={time || ""}
                    onChange={handleTime}
                    className="mb-4"
                  />

                  <div className="flex justify-center">
                    <Button
                      className="flex justify-center disabled:bg-blue-950 disabled:text-white items-center font-semibold text-2xl p-5 text-black border-none bg-blue-400"
                      type="primary"
                      onClick={handleStart}
                      disabled={
                        numQuestions <= 0 || numOptions <= 0 || title == ""
                      }
                    >
                      Start
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          )}
          {step === 2 && (
            <Row
              className="p-10 overflow-y-scroll gap-x-20"
              style={{ maxHeight: "90vh" }}
            >
              <Col span={24}>
                <Button
                  type="default"
                  onClick={handleBack}
                  className="mb-4 bg-purple-400"
                >
                  Back
                </Button>
              </Col>
              {questions.map((question, qIndex) => (
                <Col key={qIndex} span={7}>
                  <Card className="mb-4 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
                    <h2 className="text-xl font-bold mb-4">
                      Question {qIndex + 1}
                    </h2>
                    <Input
                      placeholder={`Enter question ${qIndex + 1}`}
                      value={question.question}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, e.target.value)
                      }
                      className="mb-2"
                    />
                    {question.options.map((option, oIndex) => (
                      <Input
                        key={oIndex}
                        placeholder={`Option ${oIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        className="mb-2"
                      />
                    ))}
                    <h2 className="text-xl font-bold mb-4">
                      Choose the Correct Answer :
                    </h2>
                    <Select
                      placeholder="Choose correct answer"
                      value={question.correct || undefined}
                      disabled={!enable}
                      onChange={(value) =>
                        handleCorrectOptionChange(qIndex, value)
                      }
                      className="mb-4 flex disabled:bg-white bg-white rounded-lg placeholder:font-semibold disabled:text-black"
                    >
                      {question.options.map((opt, oIndex) => (
                        <Option key={oIndex} value={opt}>
                          {opt}
                        </Option>
                      ))}
                    </Select>
                  </Card>
                </Col>
              ))}
              <Col span={24} className="flex justify-center w-full">
                <Button
                  type="primary"
                  className="w-32 h-12 text-2xl font-semibold"
                  onClick={handleReview}
                  disabled={isReviewButtonDisabled()}
                >
                  Review
                </Button>
              </Col>
            </Row>
          )}
          {step === 3 && (
            <Row
              className="p-10 overflow-y-scroll gap-x-20"
              style={{ maxHeight: "90vh" }}
            >
              <Col
                lg={24}
                className="flex flex-row text-xl gap-x-5 mb-5 text-black font-semibold"
              >
                <div>
                  Title: <label className="font-bold">{title}</label>
                </div>
                <div>Marks per Question: {marks}</div>
                <div>Time per Question (sec): {time}</div>
              </Col>
              {questions.map((question, qIndex) => (
                <Col key={qIndex} span={7}>
                  <Card className="mb-4 border-none rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
                    <h3 className="text-lg font-bold mb-2">
                      Question {qIndex + 1} - {question.question}
                    </h3>
                    <ol className="list-none pl-5 font-bold">
                      {question.options.map((option, oIndex) => (
                        <li key={oIndex}>
                          {String.fromCharCode(97 + oIndex)}. {option}
                        </li>
                      ))}
                    </ol>
                    <h3 className="text-lg font-bold mt-2">
                      Correct Answer - {question.correct}
                    </h3>
                  </Card>
                </Col>
              ))}

              <Col span={24} className="flex gap-x-5 justify-center w-full">
                <Button
                  className="w-32 h-12 text-2xl font-semibold"
                  type="default"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  className="w-32 h-12 text-2xl font-semibold"
                  type="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CreateQuiz;
