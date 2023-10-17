import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-rangeslider/lib/index.css";

import React, { useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import Timer from "./components/Timer";
import { Button, FormGroup, Col, Container, Row, Form } from "react-bootstrap";
import Range from "./components/Slider";
import { TimeProvider } from "./components/TimeContext";

// Playing video through button: https://github.com/vivekjne/video-player-react-youtube/blob/master/src/App.js

function App() {
  const workURL = useRef("https://www.youtube.com/watch?v=jfKfPfyJRdk");
  const [workVideo, setworkVideo] = useState([workURL.current]);

  const funURL = useRef("https://www.youtube.com/watch?v=b1kbLwvqugk");
  const [funVideo, setfunVideo] = useState([funURL.current]);

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

  const [runTimer, setrunTimer] = useState(false);

  // const workState = videoState.work;
  // const funState = videoState.fun;

  // // Store which video is selected with Ref
  // const currentVideo = useRef("work");

  // Update the state for a specific video type (work or fun):
  const updateVideoState = (type, newState) => {
    setVideoState((prevState) => ({
      ...prevState,
      [type]: { ...prevState[type], ...newState },
    }));
  };

  function toggleVideo() {
    if (videoState.work.playing) {
      updateVideoState("work", { playing: false });
      updateVideoState("fun", { playing: true });
    } else {
      updateVideoState("fun", { playing: false });
      updateVideoState("work", { playing: true });
    }
  }

  function startVideo() {
    updateVideoState("work", { playing: true });
  }

  function getURL(e) {
    e.preventDefault();
    console.log();
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
        <TimeProvider>
          <Row>
            <Button
              variant='primary'
              onClick={() => {
                setrunTimer(true);
                startVideo();
              }}
            >
              {!runTimer ? "Start Video" : "Switch Video"}
            </Button>
            {runTimer && <Timer />}
          </Row>
          <Row>
            <Range />
          </Row>
        </TimeProvider>
      </Container>
    </>
  );
}

export default App;
