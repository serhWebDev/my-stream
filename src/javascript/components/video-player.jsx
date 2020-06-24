import React, {Fragment, Component} from 'react';
import UiButton from "../components/ui-button";
import '../../styles/video-player.css';

class VideoPlayer extends Component {
    state = {
        cameraIsActive: true
    }

    componentDidMount() {
        this.setState({cameraIsActive: true})
    }

    render () {
        const { cameraIsActive } = this.state;

        const constraints = { audio: false, video: { width: 1080, height: 1080 } };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(mediaStream => {
                let video = document.querySelector('video');
                video.srcObject = mediaStream;
                video.onloadedmetadata = (e) => cameraIsActive ? video.play() : video.pause();
            })
            .catch(err => console.log(err.name + ": " + err.message))

        return (
            <Fragment>
                <div id="video-container" className="video-player__container">
                    <video
                        id="video-player"
                        className="video-player"
                        autoPlay={true}
                        muted={true} />
                </div>
                <div className="row">
                    <UiButton
                        primary
                        text="Play"
                        style={{width: "100px"}}
                        disabled={cameraIsActive}
                        onClick={() => this.setState({cameraIsActive: true})}/>
                    <UiButton
                        primary
                        text="Pause"
                        style={{width: "100px"}}
                        disabled={!cameraIsActive}
                        onClick={() => this.setState({cameraIsActive: false})} />
                </div>
            </Fragment>
        );
    }
};

export default VideoPlayer;