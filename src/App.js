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
  OnCallBackTest(){
    alert("OnCallBack");
  }
  render() {
    var base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcBAMAAABmCgnjAAAAFVBMVEVHcEz///8aGhpsuy2s4oDRuPMaADiElDMGAAAAAXRSTlMAQObYZgAAAFNJREFUeF7FkLENgDAQA52GGiIxwD8bPBsgBmD/aXCs6JMNcpWtk1wYx8SO6gO2N3kWtDuJBc39UtYTPEc69BIpTVqLgjJOpS7tQ1I5NyiGia2rHyT7OTg7xhBoAAAAAElFTkSuQmCC';
    return (
      <div className="App">
          <ReactBingmaps 
          bingmapKey = {this.state.BingMapKey}
          center = {[13.0827, 80.2707]}
          zoom = {7}
          mapTypeId = {"road"}
          navigationBarMode = {"compact"}
          supportedMapTypes = {["road","canvasDark"]}
          // pushPins = {
          //   [
          //     {"location":[13.0827, 80.2707], "option":{ color: 'red' }, "addHandler": {"type" : "click", callback: this.OnCallBackTest }}
          //   ]
          // }
          // infoboxes = {
          //   [
          //     {"location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: '...' }, "addHandler": {"type" : "click", callback: this.OnCallBackTest }},
          //     {"location":[13.0827, 80.2707], "option":{ htmlContent:"<div>Custom Area</div>" }}
          //   ]
          // }
          infoboxesWithPushPins = {[
            {
              "location":[49.464210, 8.190396], 
              "addHandler":"mouseover", 
              "infoboxOption": { title: 'Chennai', description: '...' },
              "pushPinOption":{ title: 'Chennai', description: '...' },
              "infoboxAddHandler": {"type" : "click", callback: this.OnCallBackTest },
              "pushPinAddHandler": {"type" : "click", callback: this.OnCallBackTest }
            }
          ]
        }
          //disableStreetside = {false}
          >
        </ReactBingmaps>
      </div>
    );
  }
}

export default App;
