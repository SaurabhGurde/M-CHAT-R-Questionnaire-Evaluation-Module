import React, { useState, useEffect } from "react";
import { type ClassValue } from "clsx";
import { cn } from "../functions";

interface propType {
  progress: number;
  bgColor?: ClassValue;
  barWidth?: ClassValue;
}

const ProgressBar: React.FC<propType> = ({ progress = 0, bgColor, barWidth }) => {
  useEffect(() => {}, []);

  return (
    <div className={cn("bg-[white] rounded-full h-2.5", barWidth ?? "w-[90vw]")}>
      <div
        className={cn(
          "h-2.5 rounded-full transition-all duration-500 ease-linear",
          bgColor ?? "bg-blue-600"
        )}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
