import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import  { useTimer } from 'react-timer-hook';
import { Button, FormGroup, Col, Container, Row, Form } from "react-bootstrap";


// Playing video through button: https://github.com/vivekjne/video-player-react-youtube/blob/master/src/App.js

function App() {
  const workURL = useRef("https://www.youtube.com/watch?v=jfKfPfyJRdk");
  const [workVideo, setworkVideo] = useState([workURL.current]);
  const [workState, setworkState] = useState({
    pip: false,
    playing: false,
    controls: true,
    light: false,

    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const funURL = useRef("https://www.youtube.com/watch?v=7KDRqBpT8NA");
  const [funVideo, setfunVideo] = useState([funURL.current]);
  const [funState, setfunState] = useState({
    pip: false,
    playing: false,
    controls: true,
    light: false,

    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  // State for Video Player
  const {
    wplaying,
    wcontrols,
    wlight,

    wmuted,
    wloop,
    wplaybackRate,
    wpip,
    wplayed,
    wseeking,
    wvolume,
  } = workState;

  const {
    fplaying,
    fcontrols,
    flight,

    fmuted,
    floop,
    fplaybackRate,
    fpip,
    fplayed,
    fseeking,
    fvolume,
  } = funState;

  // Store which video is selected with Ref
  const playerRef = useRef(null);
  

  // Function causes errors for too many rerenders
  // function handlePlayPause(target) {
  //   if (target === "workVideo") {
  //     setworkState({ ...workState, playing: !workState.playing });
  //   } else if (target === "funVideo") {
  //     setfunState({ ...funState, playing: !funState.playing });
  //   } else {
  //     alert("Invalid Video");
  //   }
  // }

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
    } = useTimer({ expirytimestamp, autoStart: false, onExpire: () => {setworkState({ ...workState, playing: !workState.playing })}});
  
    return (
      <div style={{textAlign: 'center'}}>
        <p>Pomodoro Timer</p>
        <div style={{fontSize: '100px'}}>
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p>{isRunning ? 'Running' : 'Not running'}</p>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={resume}>Resume</button>
        <button onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 10);
          restart(time)
        }}>Restart</button>
      </div>
    );
  
  }

  function toggleVideo() {
    setworkState({ ...workState, playing: !workState.playing });
  }

  function getURL(e) {
    e.preventDefault();
    // grab URL of form related to button
    let url = e.target.previousSibling.value;

    // grab data from button to determine if it targets work or fun video
    let targetType = e.target.attributes.data.value;

    // console.log(`URL is ${url} and target is ${targetType}`)

    if (targetType === "workSubmit" && ReactPlayer.canPlay(url)) {
      setworkVideo(url);
    } else if (targetType === "funSubmit" && ReactPlayer.canPlay(url)) {
      setfunVideo(url);
    } else {
      alert("Invalid Youtube URL");
    }
  }
  // variables for first call to timer
  const time = new Date();
  time.setSeconds(time.getSeconds() + 100);


  return (
    <>
      <Container fluid>
        <Row>
          <h1>Pomodoro TV</h1>
          <p>Use Pomodoro Timing to alternate playing different videos.</p>
        </Row>
        <Row>
          <Col>
            <div className='workContainer'>
              <FormGroup>
                <Form.Label>Focus Video: </Form.Label>
                <Form.Control
                  className='workURLInput'
                  type='input'
                  defaultValue={workURL.current}
                />
                <Button
                  type='submit'
                  variant='primary'
                  onClick={getURL}
                  data='workSubmit'
                  className='m-2'
                >
                  Submit
                </Button>
              </FormGroup>
              <div className='videoContainer'>
                <ReactPlayer
                  ref={playerRef}
                  width='100%'
                  height='100%'
                  url={workVideo}
                  pip={wpip}
                  playing={wplaying}
                  controls={false}
                  light={wlight}
                  loop={wloop}
                  playbackRate={wplaybackRate}
                  volume={wvolume}
                  muted={wmuted}
                />
                {/* <VideoFrame url={workVideo} /> */}
              </div>
            </div>
          </Col>
          <Col>
            <div className='funContainer'>
              <FormGroup>
                <Form.Label>Fun Video: </Form.Label>
                <Form.Control
                  className='funURLInput'
                  type='input'
                  defaultValue={funURL.current}
                />
                <Button
                  type='submit'
                  variant='primary'
                  onClick={getURL}
                  data='funSubmit'
                  className='m-2'
                >
                  Submit
                </Button>
              </FormGroup>
              <div className='videoContainer'>
                <ReactPlayer
                  ref={playerRef}
                  width='100%'
                  height='100%'
                  url={funVideo}
                  pip={fpip}
                  playing={fplaying}
                  controls={false}
                  light={flight}
                  loop={floop}
                  playbackRate={fplaybackRate}
                  volume={fvolume}
                  muted={fmuted}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Button
            variant='primary'
            // onClick={handlePlayPause("workVideo")}
          >
            Start a video
          </Button>
          <VidTimer expirytimestamp={time} />
        </Row>
      </Container>
    </>
  );
}

export default App;
