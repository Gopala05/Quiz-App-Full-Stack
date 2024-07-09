import React from "react";

interface PostNavProps {
  path: string;
}

const PostNav: React.FC<PostNavProps> = ({ path }) => {
  return (
    <>
      <nav className="flex text-black bg-black/10 items-center text-lg font-semibold p-5 justify-between">
        {path == "" ? (
          <a className="cursor-pointer">Dashboard</a>
        ) : (
          <>
            <u>
              <a href="/dashboard" className="italic cursor-pointer">
                Dashboard
              </a>
            </u>
            &nbsp;
            {">"} {path.toString()}
          </>
        )}
        <div className="flex flex-grow justify-end items-center gap-x-2">
          <img
            src="./Boy.png"
            alt="User Icon"
            className="w-10 cursor-pointer"
          />
          <span className="text-black text-xl font-bold cursor-pointer">
            GOPALA KRISHNA V
          </span>
        </div>
      </nav>
      <hr className="border-1 border-black" />
    </>
  );
};

export default PostNav;
