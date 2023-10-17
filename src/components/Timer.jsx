import React, { useContext } from "react";
import { useTimer } from "react-timer-hook";
import { TimeContext } from "./TimeContext";

function Timer() {
  const timeValues = useContext(TimeContext);
  const timer = useTimer({
    autoStart:false,
    expiryTimestamp: () => {
      const time = new Date();
      time.setMinutes(time.getMinutes() + timeValues.workTime);
      return time;
    }
  });

  const seconds = timer.seconds;
  const minutes = timeValues.workTime; //need to find a way to make an instance of this
  const hours = timer.hours;
  const days = timer.days;
  const isRunning = timer.isRunning;
  const start = timer.start;
  const pause = timer.pause;
  const resume = timer.resume;
  const restart = timer.restart;

  return (
    <div style={{ textAlign: "center" }}>
      <p>Pomodoro Timer</p>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={() => {
        const time = new Date();
        const mins = timeValues.workTime;
        time.setMinutes(time.getMinutes() + mins);
        start(time);
      }}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          const time = new Date();
          time.setMinutes(time.getMinutes() + timeValues.workTime);
          restart(time);
        }}
      >
        Restart
      </button>
    </div>
  );
}

export default Timer;
