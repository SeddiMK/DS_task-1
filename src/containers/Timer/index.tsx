import { useTimer } from "@/hooks/useTimer";
import { useEffect, useState } from "react";

interface TimerProps {
  startTime?: boolean;
  resetTime?: boolean;
  stopTime?: boolean;
  zeroTime?: (flag: boolean) => void;
}

export const Timer: React.FC<TimerProps> = ({
  startTime,
  resetTime,
  stopTime,
  zeroTime,
}) => {
  const { time, start, stop, reset } = useTimer();
  const [settingsTime, setSettingsTime] = useState(1112);
  const [zeroTimeSt, setZeroTimeSt] = useState(false);

  // start
  useEffect(() => {
    if (startTime) {
      start(settingsTime);
    }
  }, [startTime]);

  // stop
  useEffect(() => {
    if (stopTime) {
      stop();
    }
  }, [stopTime]);

  // reset
  useEffect(() => {
    console.log(resetTime, "resetTime--- Timer");

    if (resetTime) {
      reset(settingsTime);
      // start(settingsTime);
    }
  }, [resetTime]);

  // time
  useEffect(() => {
    if (time === 0) setZeroTimeSt(true);
  }, [time]);

  useEffect(() => {
    zeroTime(zeroTimeSt);
  }, [zeroTimeSt]);

  return (
    <div>
      <p>Времени осталось: {time ? time : settingsTime}s</p>
      <button onClick={stop}>Стоп</button>
      <button onClick={() => start(settingsTime)}>Старт</button>
      <button onClick={() => reset(settingsTime)}>Сбросить таймер</button>
    </div>
  );
};
