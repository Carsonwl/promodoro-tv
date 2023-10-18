
import React, { useContext, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { TimeContext, TimeContextChanger } from "./TimeContext";

function Timer(props) {
  const timeValues = useContext(TimeContext);
  const settimeValues = useContext(TimeContextChanger);
  const [timerElapsed, settimerElapsed] = useState(false);
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

  useEffect(() => {
    const time = new Date();
    !timeValues.currWork ? time.setMinutes(time.getMinutes() + timeValues.workTime) : time.setMinutes(time.getMinutes() + timeValues.funTime);
    settimeValues({ ...timeValues, currWork: !timeValues.currWork });
    restart(time);
  }, [timerElapsed]);

  const seconds = timer.seconds;
  const minutes = timer.minutes; // need to find a way to make an instance of this
  const hours = timer.hours;
  const days = timer.days;
  const isRunning = timer.isRunning;
  const start = timer.start;
  const pause = timer.pause;
  const resume = timer.resume;
  const restart = timer.restart;

  // function toggleTimer() {
  //   const time = new Date();
  //   time.setMinutes(time.getMinutes() + timeValues.funTime);
  //   restart(time);

  //   // toggle what timer is running and update context
  // }

  return (
    <div style={{ textAlign: "center" }}>
      <p>Pomodoro Timer</p>
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
