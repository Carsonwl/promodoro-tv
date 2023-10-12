import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

function Timer(props) {
  const [countdown, setCountdown] = React.useState(props.countdown || 25);
  const workTime = props.workTime || 25;
  const funTime = props.funTime || 5;
  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: null,
    autoStart: false,
    onExpire: () => console.log("Timer expired"),
  });

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + countdown);
    expiryTimestamp: time;
    start();
  }, []);

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
      <button onClick={restart}>Restart</button>
    </div>
  );
}

export default Timer;
