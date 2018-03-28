import React, { Component } from 'react';
import ReactBingmaps from 'components/ReactBingmaps';
import './App.css';
class App extends Component {
   constructor(props) {
    super(props);
    this.AddPushPinOnClick=this.AddPushPinOnClick.bind(this);
    this.state = {
        BingMapKey: "YourBingmapsKey",
        center: [13.0827, 80.2707],
        zoom: 7,
        pushPins:[
              
            ],
        infoboxes:[
              {"location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: '...' }, "addHandler": {"type" : "click", callback: this.OnCallBackTest, callbackData: "info"  }},
            ],
            infoboxesWithPushPins:[
              {
                "location":[13.0827, 80.2707], 
                "addHandler":"mouseover", 
                "infoboxOption": { title: 'Chennai', description: '...' },
                "pushPinOption":{ title: 'Chennai', description: '...' },
                "infoboxAddHandler": {"type" : "click", callback: this.OnCallBackTest },
                "pushPinAddHandler": {"type" : "click", callback: this.OnCallBackTest }
              }
            ]
      }
  }
  OnCallBackTest(data){
    alert(data);
  }
  AddPushPinOnClick(location){
    let pushPins = this.state.pushPins.slice(0);
    pushPins.push({"location":[location.latitude,location.longitude]})
    this.setState({
      pushPins:pushPins 
    });
  }
  btnClick(e){
    e.preventDefault();
    this.setState({
      //center:[19.000000, -96.000000],
      pushPins: [
              {"location":[19.000000, -96.000000], "option":{ color: 'red' }, 
              "addHandler": {"type" : "click", callback: this.OnCallBackTest }},
               {"location":[13.0827, 80.2707], "option":{ color: 'red' }, 
              "addHandler": {"type" : "click", callback: this.OnCallBackTest, callbackData: "hello" }}
            ],
            zoom:2,
            infoboxes:[
              {"location":[13.0827, 70.2707], "option":{ htmlContent:"<div>Custom Area</div>" }}
            ],
            infoboxesWithPushPins: [{
                "location":[13.0827, 70.2707], 
                "addHandler":"mouseover", 
                "infoboxOption": { title: 'Chennai', description: '...' },
                "pushPinOption":{ title: 'Chennai', description: '...' },
                "infoboxAddHandler": {"type" : "click", callback: this.OnCallBackTest },
                "pushPinAddHandler": {"type" : "click", callback: this.OnCallBackTest }
              }]
    });
  }
  render() {
    var base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcBAMAAABmCgnjAAAAFVBMVEVHcEz///8aGhpsuy2s4oDRuPMaADiElDMGAAAAAXRSTlMAQObYZgAAAFNJREFUeF7FkLENgDAQA52GGiIxwD8bPBsgBmD/aXCs6JMNcpWtk1wYx8SO6gO2N3kWtDuJBc39UtYTPEc69BIpTVqLgjJOpS7tQ1I5NyiGia2rHyT7OTg7xhBoAAAAAElFTkSuQmCC';
    return (
      <div>
      <div className="App">
          <ReactBingmaps 
          bingmapKey = {this.state.BingMapKey}
          center = {this.state.center}
          zoom = {this.state.zoom}
          mapTypeId = {"road"}
          navigationBarMode = {"compact"}
          supportedMapTypes = {["road","canvasDark"]}
          pushPins = {
            this.state.pushPins
          }
          // infoboxes = {
          //   this.state.infoboxes
          // }
          //infoboxesWithPushPins = {this.state.infoboxesWithPushPins}
          //disableStreetside = {false}
          getLocation = {{addHandler: "mouseover", callback:this.AddPushPinOnClick}}
          >
        </ReactBingmaps>
      </div>
      <div>
      </div>
      <button onClick={this.btnClick.bind(this)}>click</button>
      </div>
    );
  }
}

export default App;
