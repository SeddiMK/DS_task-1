import { useTimer } from "@/hooks/useTimer";
import { Settings } from "@/types/general";
import { useEffect, useState } from "react";

interface TimerProps {
  startTime: boolean;
  resetTime?: boolean;
  stopTime?: boolean;
  setTimeInTimer: (time: number) => void;
  zeroTime?: (flag: boolean) => void;
}

export const Timer: React.FC<TimerProps> = ({
  startTime,
  resetTime,
  stopTime,
  zeroTime,
  setTimeInTimer,
}) => {
  const { time, start, stop, reset } = useTimer();
  const [settingsTime, setSettingsTime] = useState(60);
  const [zeroTimeSt, setZeroTimeSt] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  // Получаем настройки из localStorage при первом рендере
  useEffect(() => {
    const savedSettings = localStorage.getItem("settingsGame");

    if (savedSettings) {
      const parsedSettings: Settings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
    }
  }, []);

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
      setTimeInTimer(time);
    }
  }, [stopTime]);

  // reset
  useEffect(() => {
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

  // Применить настройки
  useEffect(() => {
    if (settings) setSettingsTime(settings.timeLimit);
  }, [settings]);

  return (
    <div>
      <p>Времени осталось: {time ? time : settingsTime}s</p>

      <p>!!!Убрать в продакшене кнопки!!!</p>
      <button onClick={stop}>Стоп</button>
      <button onClick={() => start(settingsTime)}>Старт</button>
      <button onClick={() => reset(settingsTime)}>Сбросить таймер</button>
    </div>
  );
};
