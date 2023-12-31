import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-rangeslider/lib/index.css";

import React, { useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import Timer from "./components/Timer";
import { Button, FormGroup, Col, Container, Row, Form } from "react-bootstrap";
import Range from "./components/Slider";
import { TimeProvider } from "./components/TimeContext";
import Footer from "./components/Footer";

// Playing video through button: https://github.com/vivekjne/video-player-react-youtube/blob/master/src/App.js

function App() {
	const workURL = useRef("https://www.youtube.com/watch?v=jfKfPfyJRdk");
	const [workVideo, setworkVideo] = useState([workURL.current]);

	const funURL = useRef("https://www.youtube.com/watch?v=b1kbLwvqugk");
	const [funVideo, setfunVideo] = useState([funURL.current]);

	const currVideo = useRef(null);

	// Modify these variables to programmatically control videos
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
			currVideo.current = "fun";
		} else {
			updateVideoState("fun", { playing: false });
			updateVideoState("work", { playing: true });
			currVideo.current = "work";
		}
	}

	// Detects which video is playing when the pause button is clicked and stores that in currVideo.current. When resume is clicked, currVideo.current determines which video resumes
	function handlePauseandResume(action) {
		if (action === "pause") {
			videoState.work.playing
				? (currVideo.current = "work")
				: (currVideo.current = "fun");
			updateVideoState("work", { playing: false });
			updateVideoState("fun", { playing: false });
			console.log("calling pause");
		} else if (action === "resume") {
			console.log("Calling resume");
			if (currVideo.current === "work") {
				updateVideoState("work", { playing: true });
			} else if (currVideo.current === "fun") {
				updateVideoState("fun", { playing: true });
			}
		}
	}

	// ! runTimer variable check added here because this function causes error from too many state changes
	function timerExpire() {
		if (runTimer) {
			toggleVideo();
		}
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
					<h1>Promodoro TV</h1>
					<p>Use Pomodoro Timing to alternate playing different videos.</p>
				</Row>
				<Row>
					<Col m={12}>
						<div className='workContainer'>
							<FormGroup>
								<h4>Focus Video: </h4>
								<Form.Control
									className='workURLInput'
									type='input'
									defaultValue={workURL.current}
								/>
								<Button
									type='submit'
									variant='cust'
									onClick={getURL}
									data='workSubmit'
									className='m-2'
								>
									Submit
								</Button>
							</FormGroup>
						</div>
					</Col>
					<Col>
						<div className='funContainer'>
							<FormGroup>
								<h4>Break Video: </h4>
								<Form.Control
									className='funURLInput'
									type='input'
									defaultValue={funURL.current}
								/>
								<Button
									type='submit'
									variant='cust'
									onClick={getURL}
									data='funSubmit'
									className='m-2'
								>
									Submit
								</Button>
							</FormGroup>
						</div>
					</Col>
				</Row>
				<TimeProvider>
					<Row>
						<Range />
					</Row>

					<Row>
						{/* Dynamic button starts video or, if already running, switches video */}
						{/* TODO: Switching video here will immediately switch timer to the appropriate time for video type */}
						<Button
							variant='cust'
							onClick={() => {
								setrunTimer(true);
								toggleVideo();
							}}
						>
							{!runTimer ? "Start Video" : "Switch Video"}
						</Button>
						{runTimer && (
							<Timer
								isRunning={runTimer}
								onExpire={timerExpire}
								handleToggle={() => toggleVideo}
								handlePause={() => handlePauseandResume("pause")}
								handleResume={() => handlePauseandResume("resume")}
							/>
						)}
					</Row>
				</TimeProvider>
				<Row>
					<Col
						md={12}
						lg={6}
					>
						<div className='videoContainer'>
							{/* Both videos have controls set to false to prevent user from pausing or playing video without us being able to programmatically track the video state */}
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
					</Col>
					<Col>
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
					</Col>
				</Row>
			</Container>
			<Footer />
		</>
	);
}

export default App;
