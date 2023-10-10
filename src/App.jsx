import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Button, FormGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import ReactPlayer from "react-player/youtube";
import  { useTimer } from 'react-timer-hook';

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
    playing,
    controls,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
  } = workState;

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
    } = useTimer({ expirytimestamp, autoStart: false});
  
    return (
      <div style={{textAlign: 'center'}}>
        <h1>react-timer-hook </h1>
        <p>Timer Demo</p>
        <div style={{fontSize: '100px'}}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p>{isRunning ? 'Running' : 'Not running'}</p>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={resume}>Resume</button>
        <button onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 100);
          restart(time)
        }}>Restart</button>
      </div>
    );
  
  }

  function toggleVideo() {
    // setworkState({ ...workState, playing: !workState.playing });
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
                  pip={pip}
                  playing={playing}
                  controls={false}
                  light={light}
                  loop={loop}
                  playbackRate={playbackRate}
                  volume={volume}
                  muted={muted}
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
                  pip={pip}
                  playing={playing}
                  controls={false}
                  light={light}
                  loop={loop}
                  playbackRate={playbackRate}
                  volume={volume}
                  muted={muted}
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
