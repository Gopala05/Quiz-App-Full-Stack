"use client";
import { useRouter } from "next/router";
import React from "react";

const Sidebar: React.FC = () => {
  const [activePath, setActivePath] = React.useState<string>("");

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
            <li>
              <a
                href="/dashboard"
                onClick={() => setActivePath("/dashboard")}
                className={`${
                  activePath == "/dashboard"
                    ? "bg-white text-black font-bold"
                    : "bg-transparent"
                }`}
              >
                <img
                  src="./Dashboard.png"
                  alt="Dashboard Icon"
                  className="w-12"
                />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/create"
                onClick={() => setActivePath("/create")}
                className={`${
                  activePath == "/create"
                    ? "bg-white text-black font-bold"
                    : "bg-transparent"
                }`}
              >
                <img
                  src="./Create_Quiz.png"
                  alt="Create Quiz Icon"
                  className="w-12"
                />{" "}
                Create Quiz
              </a>
            </li>
            <li>
              <a
                href="/start"
                onClick={() => setActivePath("/start")}
                className={`${
                  activePath == "/start"
                    ? "bg-white text-black font-bold"
                    : "bg-transparent"
                }`}
              >
                <img
                  src="./Start_Quiz.png"
                  alt="Start Quiz Icon"
                  className="w-12"
                />
                Start Quiz
              </a>
            </li>
            <li>
              <a
                href="/results"
                onClick={() => setActivePath("/results")}
                className={`${
                  activePath == "/results"
                    ? "bg-white text-black font-bold"
                    : "bg-transparent"
                }`}
              >
                <img src="./Results.png" alt="Results Icon" className="w-12" />
                Result Records
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
