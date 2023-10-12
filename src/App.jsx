import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-rangeslider/lib/index.css";

import React, { useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";
// import { useTimer } from "react-timer-hook";
import Timer from "./components/Timer";
import { Button, FormGroup, Col, Container, Row, Form } from "react-bootstrap";
import Range from "./components/Slider";

// Playing video through button: https://github.com/vivekjne/video-player-react-youtube/blob/master/src/App.js

function App() {
  const workURL = useRef("https://www.youtube.com/watch?v=jfKfPfyJRdk");
  const [workVideo, setworkVideo] = useState([workURL.current]);

  const funURL = useRef("https://www.youtube.com/watch?v=b1kbLwvqugk");
  const [funVideo, setfunVideo] = useState([funURL.current]);

  const [currentVideo, setcurrentVideo] = useState(null);

  const [videoState, setVideoState] = useState({
    work: {
      url: workURL.current,
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
    },
    fun: {
      url: funURL.current,
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
    },
  });

  const workState = videoState.work;
  const funState = videoState.fun;

  const [workTime, setworkTime] = useState(25);
  const [funTime, setfunTime] = useState(5);

  // Update the state for a specific video type (work or fun):
  const updateVideoState = (type, newState) => {
    setVideoState((prevState) => ({
      ...prevState,
      [type]: { ...prevState[type], ...newState },
    }));
  };

  function toggleVideo() {
    console.log(`Work Time is currently ${workTime} and Fun Time is currently ${funTime}`)
    if (videoState.work.playing) {
      updateVideoState("work", { playing: false });
      updateVideoState("fun", { playing: true });
    } else if (videoState.fun.playing) {
      updateVideoState("fun", { playing: false });
      updateVideoState("work", { playing: true });
    } else {
      updateVideoState("work", { playing: true });
    }
  }

  function getURL(e) {
    e.preventDefault();

    // grab URL of form related to button
    let url = e.target.previousSibling.value;

    // grab data from button to determine if it targets work or fun video
    let targetType = e.target.attributes.data.value;

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
                  width='100%'
                  height='100%'
                  url={workVideo}
                  pip={videoState.work.pip}
                  playing={videoState.work.playing}
                  controls={false}
                  light={videoState.work.light}
                  loop={videoState.work.loop}
                  playbackRate={videoState.work.playbackRate}
                  volume={videoState.work.volume}
                  muted={videoState.work.muted}
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
                  width='100%'
                  height='100%'
                  url={funVideo}
                  pip={videoState.fun.pip}
                  playing={videoState.fun.playing}
                  controls={false}
                  light={videoState.fun.light}
                  loop={videoState.fun.loop}
                  playbackRate={videoState.fun.playbackRate}
                  volume={videoState.fun.volume}
                  muted={videoState.fun.muted}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Button
            variant='primary'
            onClick={toggleVideo}
          >
            Start a video
          </Button>
          <Timer countdown={60} />
        </Row>
        <Row>
          <Range
            workTime={workTime}
            funTime={funTime}
            onTimeChange={(newWorkTime, newFunTime) => {
              setworkTime(newWorkTime);
              setfunTime(newFunTime);
            }}
          />
        </Row>
      </Container>
    </>
  );
}

export default App;
