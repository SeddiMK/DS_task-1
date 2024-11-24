import { TimerState } from "@/types/general";
import { useState, useEffect } from "react";

export const useTimer = (): TimerState => {
  const [time, setTime] = useState<number>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let countdown: NodeJS.Timeout | null = null;

    if (isRunning) {
      countdown = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(countdown!);
    }

    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [isRunning, time]);

  const start = (initialTime: number) => {
    setTime(initialTime);
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = (initialTime: number) => {
    setTime(initialTime);
    setIsRunning(false);
  };

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
  };
};
