"use client";
import React, { useState } from "react";
import Head from "next/head";
import {
  FaGoogle,
  FaLinkedinIn,
  FaGithub,
  FaRegEnvelope,
  FaRegUser,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const router = useRouter();

  const handleSignUp = async () => {
    try {
      if (!username || !password || !name) {
        toast.error("Please fill all the fields");
        return;
      }

      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must be minimum 8 characters and include at least one digit, one uppercase letter, one lowercase letter, and one special character"
        );
        return;
      }

      const payload = {
        username: username.toLowerCase(),
        password: password,
        name: name.toUpperCase(),
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/signup`,
        payload
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        setUsername("");
        setPassword("");
        setName("");
        router.push("/dashboard");
      } else {
        toast.error(response.data.message || "Failed to sign up");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error signing up: ", error);
    }
  };

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
                Sign-Up!
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="flex flex-col items-center ">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded">
                  <FaRegEnvelope className="text-gray-400 m-2 pr-600 flex-none " />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-100 outline-none text-sm text-black flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded">
                  <FaRegUser className="text-gray-400 m-2 pr-600 flex-none " />
                  <Input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-100 outline-none text-sm text-black flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded">
                  <MdLockOutline className="text-gray-400 m-2 pr-600 flex-none mb-3" />
                  <Input.Password
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-100 outline-none text-sm text-black flex-1"
                  />
                </div>
                <button
                  onClick={handleSignUp}
                  className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <div className="border-2 w-10 border-green-500 "></div>
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Already a member?</p>
            <a
              href="/login"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
            >
              Sign In
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
