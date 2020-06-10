import React from 'react';
import { Link } from 'react-router-dom'
import SvgReact from '../../components/svg-components/svg-react';
import '../../../styles/App.css';

function IndexPage() {
    return (
        <div className="App">
            <header className="App-header">
                <SvgReact className="App-logo" />
                <p>My streaming App</p>
                <Link
                    className="App-link"
                    to='/video'>Video Page</Link>
                <a
                    className="App-link"
                    href="https://github.com/serhiiVek/my-youtoobe"
                    target="_blank"
                    rel="noopener noreferrer">
                    Github repo
                </a>
            </header>
        </div>
    );
}

export default IndexPage;
