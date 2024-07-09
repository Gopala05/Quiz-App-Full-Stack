import React from "react";
import Sidebar from "@/components/custom/Sidebar";
import { Card, Col, Row } from "antd";
import Link from "next/link";
import PostNav from "@/components/custom/PostNav";

const Dashboard = () => {
  return (
    <div className="h-[100vh] bg-white lg:overflow-hidden">
      <Row>
        <Col lg={4}>
          <Sidebar />
        </Col>
        <Col lg={20}>
          <PostNav path="" />
          <Row className="flex w-full p-10 gap-x-10">
            {/* Create Quiz */}
            <Link href="/create">
              <Card className="flex-grow flex-row border-none bg-gradient-to-r from-red-400 to-red-600 text-white flex justify-start text-3xl font-bold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-red-600 hover:-translate-y-2">
                <div className="flex w-full justify-center items-center gap-x-5">
                  <img
                    src="/Create_Quiz.png"
                    alt="Create Quiz Icon"
                    className="w-20 text-sm"
                  />
                  <div className="flex flex-col gap-y-2">
                    <span>Create Quiz</span>
                    <p className="text-base font-semibold">
                      Create a Quiz and Share it Across your friends
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Start Quiz */}
            <Link href="/start">
              <Card className="flex-grow flex-row border-none bg-gradient-to-r from-green-400 to-green-600 text-white flex justify-start text-3xl font-bold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-green-600 hover:-translate-y-2">
                <div className="flex w-full justify-center items-center gap-x-5">
                  <img
                    src="/Start_Quiz.png"
                    alt="Start Quiz Icon"
                    className="w-20 text-sm"
                  />
                  <div className="flex flex-col gap-y-2">
                    <span>Start Quiz</span>
                    <p className="text-base font-semibold">
                      Start a Quiz and Challenge your friends
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Results */}
            <Link href="/results">
              <Card className="flex-grow flex-row border-none bg-gradient-to-r from-purple-400 to-purple-600 text-white flex justify-start text-3xl font-bold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-600 hover:-translate-y-2">
                <div className="flex w-full justify-center items-center gap-x-5">
                  <img
                    src="/Results.png"
                    alt="Results Quiz Icon"
                    className="w-20 text-sm"
                  />
                  <div className="flex flex-col gap-y-2">
                    <span>Check Results</span>
                    <p className="text-base font-semibold">
                      Curious to know your standings in the Quiz?
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </Row>

          <Row className="flex w-full p-10 gap-x-10 text-black">
            <Col lg={9}>
              <Card className="flex-grow flex-row border-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center text-3xl font-bold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-black hover:-translate-y-2">
                <div className="flex justify-center">
                  <img
                    src="./Trophy.png"
                    alt="Trophy Icon"
                    className="flex justify-center"
                  />
                </div>
                <div className="text-2xl justify-center text-center flex flex-col">
                  Elevate Your Academic Success! 🚀
                  <p className="text-white text-base font-semibold mt-2">
                    Join us and ace your quizzes effortlessly. Tap here to start
                    your journey to victory!
                  </p>
                </div>
              </Card>
            </Col>
            <Col lg={14}>
              <div className="flex flex-col gap-y-10 pt-2">
                {/* Achievement */}
                <Card className="flex-grow flex-row border-none bg-gradient-to-r from-yellow-400 to-yellow-600 text-white flex justify-start text-2xl font-bold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-yellow-600 hover:-translate-y-2 p-6">
                  <div className="flex w-full justify-center items-center gap-x-5">
                    <img
                      src="./Achievement.png"
                      alt="Achievement Icon"
                      className="w-32 ml-14 mr-14 text-sm"
                    />
                    <div className="flex flex-col gap-y-2">
                      <span>Achievements</span>
                      <p className="text-base font-semibold">
                        Track your achievements and milestones.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Leaderboard */}
                <Card className="flex-grow flex-row border-none bg-gradient-to-r from-blue-400 to-blue-600 text-white flex justify-start text-2xl font-bold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-600 hover:-translate-y-2 p-6">
                  <div className="flex w-full justify-start items-center gap-x-5">
                    <img
                      src="./Leadboard.png"
                      alt="Leaderboard Icon"
                      className="w-60 text-sm"
                    />
                    <div className="flex flex-col gap-y-2">
                      <span>Leaderboard</span>
                      <p className="text-base font-semibold">
                        See how you rank among your peers.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
