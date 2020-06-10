import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          My youtube App
        </p>
        <a
          className="App-link"
          href="https://github.com/serhiiVek/my-youtoobe"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github repo
        </a>
      </header>
    </div>
  );
}

export default App;
