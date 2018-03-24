import React, { Component } from 'react';
import ReactBingmaps from 'components/ReactBingmaps';
import './App.css';
class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
        BingMapKey: "YourBingmapsKey"
      }
  }
  render() {
    return (
      <div className="App">
          <ReactBingmaps 
          bingmapKey={this.state.BingMapKey}
          center={[45.464210, 9.190396]}
          zoom={5}
          mapTypeId={"birdseye"}
          navigationBarMode={"compact"}
          supportedMapTypes={["road","canvasDark"]}
          >
        </ReactBingmaps>
      </div>
    );
  }
}

export default App;
