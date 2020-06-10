import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import IndexPage from './javascript/pages/index/index';
import StreamPage from './javascript/pages/stream/index';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path='/video' component={StreamPage}/>
                <Route path='/' component={IndexPage}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
