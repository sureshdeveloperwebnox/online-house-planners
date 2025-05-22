import React from "react";
import { Compare } from "./Compare.jsx";

export function CompareComponent() {
  return (
    // <div className="w-screen h-screen flex items-center justify-center bg-neutral-200 dark:bg-neutral-900">
      <div className=" flex items-center justify-center p-4 border rounded-3xl  dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <Compare
          firstImage="https://assets.aceternity.com/code-problem.png"
          secondImage="https://assets.aceternity.com/code-solution.png"
          firstImageClassName="object-cover object-top"
          secondImageClassname="object-cover object-top"
          className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
          slideMode="hover"
        />
      </div>
    // </div>
  );
}
