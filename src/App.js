import React, { Component } from 'react';
import ReactBingmaps from 'components/ReactBingmaps';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <ReactBingmaps 
          bingmapKey = {"bingmapKey"}
          center = {[13.0827, 80.2707]}
          pushPins = {
            [
              {"location":[13.0827, 80.2707]}
            ]
          }
          >
        </ReactBingmaps>
      </div>
    );
  }
}

export default App;
