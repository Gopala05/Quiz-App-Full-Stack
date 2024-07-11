"use client";
import { Dropdown, Menu } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { RiLogoutBoxRLine } from "react-icons/ri";

interface PostNavProps {
  path: string;
}

const PostNav: React.FC<PostNavProps> = ({ path }) => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString ? userString : "");
  const router = useRouter();

  const handleLogout = async (e: any) => {
    e.preventDefault();

    try {
      toast.success("Logged out Successfully");
      localStorage.removeItem("user");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in Login: ", error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <button
          onClick={(e) => handleLogout(e)}
          className="border-none bg-gradient-to-r from-green-400 to-green-600 flex-grow w-full justify-center border-0 text-black flex font-bold p-3"
        >
          Log Out <RiLogoutBoxRLine className="font-bold text-xl" />
        </button>
      </Menu.Item>
    </Menu>
  );

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
          <Dropdown
            overlay={menu}
            className="hover:cursor-pointer p-0"
            trigger={["hover"]}
          >
            <span className="text-black text-xl font-bold cursor-pointer">
              {user?.name}
            </span>
          </Dropdown>
        </div>
      </nav>
      <hr className="border-1 border-black" />
    </>
  );
};

export default PostNav;
