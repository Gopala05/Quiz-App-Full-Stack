"use client";

import { motion } from "framer-motion";
import React from "react";
import AuroraBackground from "@/components/ui/background";
import Navbar from "@/components/custom/nav";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text";
// import { TracingBeam } from "@/components/ui/tracing";

const AuroraBackgroundDemo = () => {
  return (
    // <TracingBeam className="px-6">
    <div>
      <div className="h-[100vh]">
    <AuroraBackground>
      <Navbar />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <TextRevealCard
          text="Unlock your knowledge"
          revealText="Answer the questions"
        >
          <TextRevealCardTitle>Test Your Wits</TextRevealCardTitle>
          <TextRevealCardDescription>
            Ready to challenge yourself? Dive into our quiz and test your
            skills.
          </TextRevealCardDescription>
        </TextRevealCard>
      </motion.div>
    </AuroraBackground>
    </div>
    <div className="h-[100vh] flex items-center content-center bg-[#000000]">
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold text-[#FFFFFF]">
              <span className="text-[#FFD700]">Double</span>Trouble
            </div>
            <div className="py-10">
              <h2 className="text-[#FFD700] text-3xl font-bold mb-2">About Us</h2>
              <div className="border-2 w-10 border-[#FFD700] inline-block mb-2"></div>
              <p className="text-[#FFFFFF] my-3">
                Welcome to DoubleTrouble! We are passionate about delivering the best
                services to our clients. Our mission is to provide innovative solutions
                and excellent customer service.
              </p>
              <p className="text-[#FFFFFF] my-3">
                Our team of experts works tirelessly to ensure that we meet and exceed
                your expectations. We believe in integrity, innovation, and excellence.
              </p>
            </div>
          </div>
          <div className="w-2/5 bg-[#FFD700] text-[#FFFFFF] rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
            <div className="border-2 w-10 border-[#FFFFFF] inline-block mb-2"></div>
            <form className="flex flex-col items-center">
              <div className="bg-[#FFFFFF] w-64 p-2 flex items-center mb-3 rounded">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-[#FFFFFF] outline-none text-sm text-[#000000] flex-1"
                />
              </div>
              <div className="bg-[#FFFFFF] w-64 p-2 flex items-center mb-3 rounded">
                <textarea
                  name="question"
                  placeholder="Your Question"
                  className="bg-[#FFFFFF] outline-none text-sm text-[#000000] flex-1 h-24 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="border-2 border-[#FFFFFF] rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#FFFFFF] hover:text-[#FFD700]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div> 

      </div>
    // </TracingBeam>
  );
};

export default AuroraBackgroundDemo;