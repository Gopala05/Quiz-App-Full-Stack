"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/custom/Sidebar";
import { Card, Col, Row, Button, Table, Space, Tag, Input } from "antd";
import PostNav from "@/components/custom/PostNav";
import axios from "axios";
import toast from "react-hot-toast";
import StatCard from "@/components/custom/StatCard";

interface ScoreProp {
  id: number;
  marks_scored: number;
  maximum_score: number;
  correct_answers: number;
  wrong_answers: number;
  quiz_title: string;
  username: string;
}

const Results = () => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString ? userString : "");

  const [title, setTitle] = useState<string>("");
  const [results, setResults] = useState<ScoreProp[]>([]);
  const [selected, setSelected] = useState<boolean>(false);

  // useEffect(() => {
  //   fetchResults();
  // }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/leadboard?quiz_title=${title}`
      );
      if (response.status === 200) {
        const { details } = response.data;
        setResults(details);
        setSelected(true);
      } else {
        toast.error(response.data.message || "Failed to get Quiz Records");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error getting quiz results: ", error);
    }
  };

  let rank = 1;

  const calculateRank = (index: number, prev: number) => {
    if (prev == -1) {
      return rank;
    }
    if (results[index].marks_scored == results[prev].marks_scored) {
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
          <PostNav path="Lead Board" />
          <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
            {!selected && (
              <Row className="flex justify-center items-center h-[80vh] w-full">
                <Col span={8}>
                  <Card className="flex-grow flex-col border-none bg-gradient-to-r from-blue-400 to-blue-600 flex justify-start text-2xl font-bold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-600 hover:-translate-y-2 p-6">
                    <h2 className="text-3xl font-bold mb-4 text-center">
                      Check your Standings
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

                    <div className="flex justify-center">
                      <Button
                        className="flex justify-center disabled:bg-blue-950 disabled:text-white items-center font-semibold text-2xl p-5 text-black border-none bg-blue-400 mt-4"
                        type="primary"
                        onClick={fetchResults}
                        disabled={title == ""}
                      >
                        Check Results
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            )}
            {selected && (
              <div className="my-6">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  Results:
                </h2>
                <Table
                  dataSource={results}
                  columns={columns}
                  className="bordered border-black"
                  rowClassName={(record: ScoreProp) =>
                    record.username === user.username ? "bg-blue" : ""
                  }
                />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Results;
