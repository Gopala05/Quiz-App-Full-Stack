"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

const Home=()=> {
  return (
    <div className="relative min-h-screen flex">
    {/* Left Blue Section */}
      <header className="py-6 fixed z-50 flex w-full  px-8 justify-between items-center">
        <div className="text-2xl font-bold">Double Trouble</div>
        {/* <nav className="space-x-4">
          <a href="#" className="hover:underline">Product</a>
          <a href="#" className="hover:underline">Solution</a>
          <a href="#" className="hover:underline">Enterprise</a>
          <a href="#" className="hover:underline">Pricing</a>
        </nav> */}
        <div className="space-x-4 text-black font-bold">
          <a href="/login" className="hover:underline">Login</a>
          <a href="/signUp" className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500">Sign Up</a>
        </div>
      </header>
    

    {/* Right White Section */}
    <div className="w-1/2 bg-black text-black flex items-center justify-center relative z-10">
    <CardContainer className="inter-var h-[100vh] ">
       <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
         <CardItem
           translateZ="50"
           className="text-4xl font-bold text-neutral-600 dark:text-white flex w-full justify-center"
        >
          WELCOME!
         </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm mt-6 dark:text-neutral-300 flex w-full justify-center"
        >
          Ready to Challenge yourself with a quiz?
        </CardItem>
        <CardItem translateZ="100" className="w-full ">
          <img
            src="./Logo.png"
            className="object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
    </div>

    <div className="w-1/2 bg-[#06f8ec] text-black flex flex-col justify-between relative z-10">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-6xl font-bold mb-4">Want to make a Quiz?</h1>
        <p className="text-2xl mb-6">Let's make one together ;)</p>
        <Link href="/login">
        <button className=" border-none bg-yellow-400 text-[#334961] flex justify-start text-2xl font-semibold rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-yellow-600 hover:-translate-y-2 p-6">Get Started</button>
        </Link>
      </main>
      
    </div>
    <div>
    <footer className="py-8 z-50 flex w-full text-white fixed ">
        C Copy Right
        </footer>
    </div>


  </div>
  );
}

export default Home;