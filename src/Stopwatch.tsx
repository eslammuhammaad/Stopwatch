import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  const startTime = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime.current);
      }, 10);

      return () => {
        clearInterval(intervalRef.current!);
      };
    }
  }, [isRunning]);

  const start = (): void => {
    setIsRunning(true);
    startTime.current = Date.now() - elapsedTime;
  };

  const stop = (): void => {
    setIsRunning(false);
  };

  const reset = (): void => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (): string => {
    let hours = Math.floor(elapsedTime / 1000 / 60 / 60);
    let minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
    let seconds = Math.floor(elapsedTime / 1000) % 60;
    let milliseconds: number = Math.floor((elapsedTime % 1000) / 10);
    hours = String(hours).padStart(2, "0") as unknown as number;
    minutes = String(minutes).padStart(2, "0") as unknown as number;
    seconds = String(seconds).padStart(2, "0") as unknown as number;
    milliseconds = String(milliseconds).padStart(2, "0") as unknown as number;
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className=" flex flex-col  items-center">
      <h1 className="font-bold text-3xl">Stopwatch</h1>
      <div className="flex flex-col items-center  border-4 rounded-full border-black p-10 mt-4 ">
        <div className="text-7xl font-bold font-mono text-gray-600 mb-6">
          {formatTime()}
        </div>
        <div>
          <button
            onClick={start}
            className="bg-green-500 hover:bg-green-700 text-2xl font-bold p-3 m-1 min-w-28 border-none rounded-lg cursor-pointer text-white transition-all"
          >
            Start
          </button>
          <button
            onClick={stop}
            className="bg-red-500 hover:bg-red-700 text-2xl font-bold p-3 m-1 min-w-28 border-none rounded-lg cursor-pointer text-white transition-all"
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="bg-blue-500 hover:bg-blue-700 text-2xl font-bold p-3 m-1 min-w-28 border-none rounded-lg cursor-pointer text-white transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
