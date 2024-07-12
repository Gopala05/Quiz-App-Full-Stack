"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/custom/Sidebar";
import { Card, Col, Row, Button, Table, Tag } from "antd";
import PostNav from "@/components/custom/PostNav";
import axios from "axios";
import toast from "react-hot-toast";
import StatCard from "@/components/custom/StatCard";

interface ScoreProp {
  id: number;
  marks_scored: number;
  maximum_score: number;
  quiz_title: string;
  username: string;
  correct_answers: number;
  wrong_answers: number;
}

const Results = () => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString ? userString : "");

  const [results, setResults] = useState<ScoreProp[]>([]);
  const [score, setScore] = useState<ScoreProp | undefined>(undefined);
  const [data, setData] = useState<ScoreProp[]>([]);
  const [selected, setSelected] = useState<boolean>(false);

  const handleResults = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/quiz-results?username=${user.username}`
      );
      console.log(response);
      if (response.status === 200) {
        const scores: ScoreProp[] = response.data.details;
        setResults(scores);
      } else {
        toast.error(response.data.message || "Failed to get Quiz Records");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error getting quiz results: ", error);
    }
  };

  useEffect(() => {
    handleResults();
  }, []);

  const handleSelectQuiz = async (selectedScore: ScoreProp) => {
    setScore(selectedScore);
    setSelected(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/leadboard?username=${user.username}&quiz_title=${selectedScore.quiz_title}`
      );
      console.log(response);
      if (response.status === 200) {
        const data = response.data.details;
        setData(data);
      } else {
        toast.error(response.data.message || "Failed to get Leadboard Records");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error getting Leadboard results: ", error);
    }
  };

  let rank = 1;

  const calculateRank = (index: number, prev: number) => {
    if (prev == -1) {
      return rank;
    }
    if (data[index].marks_scored == data[prev].marks_scored) {
      return rank;
    }
    rank++;
    return rank;
  };

  const columns = [
    {
      title: "Rank",
      key: "rank",
      render: (_: any, record: ScoreProp, index: number) => {
        const rank = calculateRank(index, index - 1);
        return <Tag color="blue">{rank}</Tag>;
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (username: string) => (
        <strong
          style={{ fontWeight: username === user.username ? "bold" : "normal" }}
        >
          {username}
        </strong>
      ),
    },
    {
      title: "Marks Scored",
      dataIndex: "marks_scored",
      key: "marks_scored",
    },
    {
      title: "Maximum Score",
      dataIndex: "maximum_score",
      key: "maximum_score",
    },
    {
      title: "Correct Answers",
      dataIndex: "correct_answers",
      key: "correct_answers",
    },
    {
      title: "Wrong Answers",
      dataIndex: "wrong_answers",
      key: "wrong_answers",
    },
  ];

  return (
    <div className="h-[100vh] bg-white lg:overflow-hidden">
      <Row>
        <Col lg={4}>
          <Sidebar />
        </Col>
        <Col lg={20}>
          <PostNav path="Result Records" />
          <div className="max-w-[1500px] mx-auto w-[90%] py-10">
            {!selected ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((score: ScoreProp, index: number) => (
                  <Card
                    key={index}
                    title={
                      <p className="font-bold text-xl">Quiz {index + 1}</p>
                    }
                    onClick={() => handleSelectQuiz(score)}
                    hoverable
                    className="flex-grow flex-col cursor-pointer text-center border-none bg-gradient-to-r from-yellow-400 to-yellow-600 text-white flex justify-start text-2xl font-bold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-yellow-600 hover:-translate-y-2 p-6"
                  >
                    {score.quiz_title}
                  </Card>
                ))}
              </div>
            ) : (
              score && (
                <div className="text-center">
                  <div className="flex w-full justify-start mt-8">
                    <Button
                      className="py-3 px-8 text-lg font-semibold bg-blue-400 text-white rounded-lg shadow-md hover:bg-blue-500"
                      onClick={() => setSelected(false)}
                    >
                      Back
                    </Button>
                  </div>
                  <h3 className="text-2xl uppercase mb-10 text-black">
                    Results 📈
                  </h3>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                    <StatCard
                      title="Percentage"
                      value={`${(
                        (score.marks_scored / score.maximum_score) *
                        100
                      ).toFixed(2)}%`}
                    />
                    <StatCard title="Total Score" value={score.marks_scored} />
                    <StatCard
                      title="Maximum Score"
                      value={score.maximum_score}
                    />
                    <StatCard
                      title="Correct Answers"
                      value={score.correct_answers}
                    />
                    <StatCard
                      title="Wrong Answers"
                      value={score.wrong_answers}
                    />
                  </div>
                  <div className="flex w-full justify-start my-4">
                  <h2 className="text-xl text-black font-semibold text-start">Leaderboard:</h2>
                  </div>
                  <Table
                    dataSource={data}
                    columns={columns}
                    rowClassName={(record: ScoreProp) =>
                      record.username === user.username ? "bg-blue" : ""
                    }
                  />
                </div>
              )
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Results;
