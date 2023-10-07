import React from 'react';
import ReactPlayer from 'react-player/youtube';

function VideoFrame(props) {

    return ( 
        <ReactPlayer url={props.url}
        width="100%"
        height="100%"
        controls={true}
        playing={false}
        muted={true}
        volume={0}
        />
     );
}

export default VideoFrame;