import React from 'react';
import { useTimer } from "react-timer-hook";

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state {
            countdown: props.countdown,
        }

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
            this.state.countdown,
            autoStart: false,
            onExpire: () => this.toggleVideo(),
          });
    }

    render() { 
        return (  );
    }
}
 
export default Timer;

// REFERENCE

function VidTimer({ expirytimestamp }) {
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
      expirytimestamp,
      autoStart: false,
      onExpire: () => toggleVideo(),
    });

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
            // Restarts to 5 minutes timer
            const time = new Date();
            time.setSeconds(time.getSeconds() + 10);
            restart(time);
          }}
        >
          Restart
        </button>
      </div>
    );
  }