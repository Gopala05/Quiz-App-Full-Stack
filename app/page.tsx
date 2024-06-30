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

    // </TracingBeam>
  );
};

export default AuroraBackgroundDemo;
