"use client";
import React from "react";
import Head from "next/head";
import {
  FaGoogle,
  FaLinkedinIn,
  FaGithub,
  FaRegEnvelope,
  FaRegUser,
} from "react-icons/fa";
import {MdLockOutline} from 'react-icons/md';
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "antd";

const page = () => {
  const [username, setUsermame] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = async () => {
    try {
    if (username && password) {
      const response : any = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/signin`, {
        username: username,
        password: password
      })

      if (response.status == 200) {
        toast.success(response.data.message)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        window.location.href = '/dashboard';
      } else {
        toast.error(response.data.message)
      }
    } else {
      toast.error("Please provide both Username and Password")
    }
  } catch (error: any) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in Login: ", error);
  }
  }

  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Login</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold text-black">
              <span className="text-green-500"> Double</span>Trouble
            </div>
            <div className="py-10">
              <h2 className="text-green-500 text-3xl font-bold mb-2">
                Sign in to Account
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a
                  href="#"
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaGoogle className="text-black text-sm" />
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaLinkedinIn className="text-black text-sm" />
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-200 rounded-full p-3 mx-1"
                >
                  <FaGithub className="text-black text-sm" />
                </a>
              </div>
              <p className="text-gray-400 my-3">or use your email account</p>
              <div className="flex flex-col items-center ">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded">
                  <FaRegUser className="text-gray-400 m-2 pr-600 flex-none " />
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={(e) => setUsermame(e.target.value)}
                    className="bg-gray-100 outline-none text-sm text-black flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded">
                  <MdLockOutline className="text-gray-400 m-2 pr-600 flex-none mb-3" />
                  <Input.Password
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-100 outline-none text-sm text-black flex-1"
                  />
                </div>
                <div className="flex justify-between w-64 mb-5">
                  <label className="flex items-center text-xs text-black"><input type="checkbox" name="remember" className= "mr-1" />Remember me</label>
                  <a href="" className="text-xs text-black">Forgot Password?</a>
                </div>
                <button onClick={handleLogin}
              className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
            >
              Sign In
            </button>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <div className="border-2 w-10 border-green-500 "></div>
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Fill up some information and start your journey with us.
            </p>
            <a
              href="/signUp"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
            >
              Sign Up
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
