import React, { useContext } from "react";
import { useTimer } from "react-timer-hook";
import { TimeContext, TimeContextChanger } from "./TimeContext";

function Timer() {
  const timeValues = useContext(TimeContext);
  const settimeValues = useContext(TimeContextChanger);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: false,
  });

  

  return (
    <div style={{ textAlign: "center" }}>
      <p>Pomodoro Timer {timeValues.workTime}</p>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
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

