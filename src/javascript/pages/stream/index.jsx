import React, {Component} from 'react';
import VideoPlayer from "../../components/video-player"
import { Link } from 'react-router-dom'
import '../../../styles/App.css';


class StreamPage extends Component{
    componentDidMount() {

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>This is  streaming page</p>
                    <VideoPlayer/>
                    <Link
                        className="App-link"
                        to='/'>Return</Link>
                </header>
            </div>
        );
    }
}

export default StreamPage;
