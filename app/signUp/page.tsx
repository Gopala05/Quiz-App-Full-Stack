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
const page = () => {
  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
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
                <input
                    type="email"
                    name="username"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm text-black flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded">
                  <FaRegUser className="text-gray-400 m-2 pr-600 flex-none " />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="bg-gray-100 outline-none text-sm text-black flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 rounded">
                  <MdLockOutline className="text-gray-400 m-2 pr-600 flex-none mb-3" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm text-black flex-1"
                  />
                </div>
                <a
              href=""
              className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
            >
              Sign Up
            </a>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <div className="border-2 w-10 border-green-500 "></div>
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Already a member?
            </p>
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
