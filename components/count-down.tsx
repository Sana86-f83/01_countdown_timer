"use client";

import { useState, useEffect, ChangeEvent, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };
  // JSX return statement rendering the Countdown UI
  return (
    // Container div for centering the content
    <div className=" flex flex-col items-center justify-center h-screen bg-gradient-to-r from-violet-700 to-fuchsia-500">
      {/* Timer box container */}
      <div className="bg-gray-800  rounded-s-full p-10 w-full max-w-lg ">
        {/* Title of the countdown timer */}
        <h1 className="text-4xl font-bold mb-4 text-white font-serif hover:text-purple-600 text-center ">
          Countdown Timer
        </h1>

        {/* Input and set button container */}
        <div className="flex items-center  text-4xl  text-white  bg-black-950">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
                  <br></br>

          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-2xl font-serif text-white hover:text-white bg-blue-800 hover:bg-purple-900 rounded-xl border-x-4 border-black hover:border-x-pink-400"
          >
            Set
          </Button>
        </div>
        {/* Display the formatted time left */}

        <div className="text-7xl font-bold text-fuchsia-800 hover:text-white mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="w-full max-w-24
            text-black hover:text-white text-xl bg-indigo-500  hover:bg-fuchsia-900 border-2 hover:border-2 hover:border-blue-700  rounded-3xl 

"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="w-full max-w-24
 text-black hover:text-white text-xl bg-fuchsia-500    hover:bg-fuchsia-900 border-2 hover:border-2 hover:border-blue-700  rounded-3xl "
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full max-w-24
 text-black hover:text-white text-xl bg-purple-500  hover:bg-fuchsia-900 border-2 hover:border-2 hover:border-blue-700  rounded-3xl 

"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
