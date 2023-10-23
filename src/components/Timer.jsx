
import React, { useContext, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { TimeContext, TimeContextChanger } from "./TimeContext";

function Timer(props) {
  const timeValues = useContext(TimeContext);
  const settimeValues = useContext(TimeContextChanger);

  // Variable that is monitored by useEffect to trigger elapsed time
  const [timerElapsed, settimerElapsed] = useState(false);

  // Establish timer, callback function to app on expire, and initiates timer with the work time
  const timer = useTimer({
    autoStart: props.isRunning,
    onExpire: () => {
      settimerElapsed(!timerElapsed);
      props.onExpire();
    },
    expiryTimestamp: () => {
      const time = new Date();
      time.setMinutes(time.getMinutes() + timeValues.workTime);
      return time;
    },
  });

  // Detects when time expires, toggles which video should play, and sets appropraite time value
  useEffect(() => {
    const time = new Date();
    !timeValues.currWork ? time.setMinutes(time.getMinutes() + timeValues.funTime) : time.setMinutes(time.getMinutes() + timeValues.workTime);
    settimeValues({ ...timeValues, currWork: !timeValues.currWork });
    restart(time);
  }, [timerElapsed]);

  const seconds = timer.seconds;
  const minutes = timer.minutes;
  const hours = timer.hours;
  const days = timer.days;
  const isRunning = timer.isRunning;
  const start = timer.start;
  const pause = timer.pause;
  const resume = timer.resume;
  const restart = timer.restart;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          // ! This restart is not restarting with the appropriate time value
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
