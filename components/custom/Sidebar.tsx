"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Sidebar: React.FC = () => {
  const [activePath, setActivePath] = React.useState<string>("");
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }
  }, []);

  return (
    <div className="drawer lg:drawer-open drawer-start">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-primary lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-white text-xl min-h-full w-80 p-4 gap-y-5">
          <div className="flex items-center gap-x-2">
            <img src="./Logo.png" alt="Logo" className="w-32" />
            <span>Double Trouble</span>
          </div>
          <ul className="flex flex-col gap-y-5">
            <li
              onClick={() => {
                router.push("/dashboard"), setActivePath("/dashboard");
              }}
            >
              <div
                className={`${
                  activePath == "/dashboard"
                    ? "hover:bg-white text-black font-bold hover:rounded-lg hover:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    : "bg-transparente hover:bg-white hover:text-black hover:font-bold"
                }`}
              >
                <img
                  src="./Dashboard.png"
                  alt="Dashboard Icon"
                  className="w-12"
                />
                Dashboard
              </div>
            </li>
            <li
              onClick={() => {
                router.push("/create"), setActivePath("/create");
              }}
            >
              <div
                className={`${
                  activePath == "/create"
                    ? "hover:bg-white text-black font-bold hover:rounded-lg hover:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    : "bg-transparente hover:bg-white hover:text-black hover:font-bold"
                }`}
              >
                <img
                  src="./Create_Quiz.png"
                  alt="Create Quiz Icon"
                  className="w-12"
                />{" "}
                Create Quiz
              </div>
            </li>
            <li
              onClick={() => {
                router.push("/start"), setActivePath("/start");
              }}
            >
              <div
                className={`${
                  activePath == "/start"
                    ? "hover:bg-white text-black font-bold hover:rounded-lg hover:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    : "bg-transparente hover:bg-white hover:text-black hover:font-bold"
                }`}
              >
                <img
                  src="./Start_Quiz.png"
                  alt="Start Quiz Icon"
                  className="w-12"
                />
                Start Quiz
              </div>
            </li>
            <li
              onClick={() => {
                router.push("/results"), setActivePath("/results");
              }}
            >
              <div
                className={`${
                  activePath == "/results"
                    ? "hover:bg-white text-black font-bold hover:rounded-lg hover:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    : "bg-transparente hover:bg-white hover:text-black hover:font-bold"
                }`}
              >
                <img src="./Results.png" alt="Results Icon" className="w-12" />
                Result Records
              </div>
            </li>

            <li
              onClick={() => {
                router.push("/lead-board"), setActivePath("/lead-board");
              }}
            >
              <div
                className={`${
                  activePath == "/lead-board"
                    ? "hover:bg-white text-black font-bold hover:rounded-lg hover:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    : "bg-transparente hover:bg-white hover:text-black hover:font-bold"
                }`}
              >
                <img src="./Lead_Board.png" alt="Lead Board Icon" className="w-12" />
                Lead Board
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
