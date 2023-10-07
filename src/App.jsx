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
import VideoFrame from "./components/VideoFrame";



function App() {
  const workURL = useRef("https://www.youtube.com/watch?v=jfKfPfyJRdk");
  const [workVideo, setworkVideo] = useState([workURL.current]);

  const funURL = useRef("https://www.youtube.com/watch?v=7KDRqBpT8NA");
  const [funVideo, setfunVideo] = useState([funURL.current]);

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
                  className="m-2"
                >
                  Submit
                </Button>
              </FormGroup>
              <div className='videoContainer'>
                <VideoFrame url={workVideo} />
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
                  className="m-2"
                >
                  Submit
                </Button>
              </FormGroup>
              <div className='videoContainer'>
                <VideoFrame url={funVideo} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
