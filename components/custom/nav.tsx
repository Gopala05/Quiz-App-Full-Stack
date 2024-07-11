"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/nav";
import { cn } from "@/utils/cn";

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Take Quiz</HoveredLink>
            <HoveredLink href="/interface-design">Create Quiz</HoveredLink>
            <HoveredLink href="/interface-design">Check My Score</HoveredLink>
            <HoveredLink href="/interface-design">Check the Results</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Top Quizes">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Quiz 1"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Quiz 2"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Quiz 3"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Quiz 4"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Explore More">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/login">Login</HoveredLink>
            <HoveredLink href="/signUp">Sign Up</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active="" item="About"></MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar