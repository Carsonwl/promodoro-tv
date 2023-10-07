import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Button, FormGroup } from "react-bootstrap";
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
    let url = e.target.previousSibling.value;
    let targetType = e.target.attributes.data.value;
    console.log(`URL is ${url} and target is ${targetType}`)
    
    if (targetType === "workSubmit" && ReactPlayer.canPlay(url)) {
      setworkVideo(url);
    }
    
    else if (targetType === "funSubmit" && ReactPlayer.canPlay(url)) {
      setfunVideo(url); 
    }
    else {
      alert("Invalid Youtube URL");
    };
  }

  return (
    <>
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
            data = "workSubmit"
          >
            Submit
          </Button>
        </FormGroup>
        <div className='videoContainer'>
          <VideoFrame url={workVideo} />
        </div>
      </div>
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
            data="funSubmit"
          >
            Submit
          </Button>
        </FormGroup>
        <div className='videoContainer'>
          <VideoFrame url={funVideo} />
        </div>
      </div>
    </>
  );
}

export default App;
