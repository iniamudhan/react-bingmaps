import React, { Component } from 'react';
import ReactBingmaps from 'components/ReactBingmaps';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible : true,
      bingmapKey: "AksOASfzdybmndjlOxhWnhZaNtzG5CMgqUFIgB5Ji8W6Gr748WQL5mijk5w4OmDD", //Don't use this key in your environment.
      infoboxes : [
        {
          "location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: '...' }, "addHandler": {"type" : "click", callback: this.callBackMethod}
        }
      ],
      pushPins : [
        {
          "location":[13.0827, 80.2707], "option":{ color: 'red' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      regularPolygons:[
        {
          "center":[13.0827, 80.2707],
          "radius":5,
          "points":36,
          "option": {fillColor: "rgba(0,0,0,0.5)", strokeThickness: 2}
        }
      ],
      infoboxesWithPushPins: [
        {
          "location":[13.0827, 80.2707], 
          "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
          "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
          "pushPinOption":{ title: 'Pushpin Title', description: 'Pushpin' },
          "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
          "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      boundary: {
        "location":['chennai'],
        "option":{
          entityType: 'PopulatedPlace'
        },
        "polygonStyle" :{
          fillColor: 'rgba(161,224,255,0.4)',
          strokeColor: '#a495b2',
          strokeThickness: 2
        }
      },
      searchInput: ""
    }
  }
  changeState(){
    this.setState({
      infoboxes : [
        {
          "location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: 'Tamilnadu' }, "addHandler": {"type" : "click", callback: this.callBackMethod}
        }
      ],
      pushPins : [
        {
          "location":[13.0827, 80.2707], "option":{ color: 'yellow' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        },
        {
          "location":[13.0727, 80.2707], "option":{ color: 'green' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      regularPolygons:[
        {
          "center":[13.0827, 80.2707],
          "radius":5,
          "points":6,
          "option": {fillColor: "rgba(0,0,0,0.5)", strokeThickness: 2}
        }
      ],
      infoboxesWithPushPins: [
        {
          "location":[13.0827, 80.2707], 
          "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
          "infoboxOption": { title: 'Chennai', description: 'Infobox' },
          "pushPinOption":{ title: 'Chennai', description: 'Pushpin' },
          "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
          "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      boundary: {
        "search" : "636303",
        "polygonStyle" :{
          fillColor: 'rgba(161,224,255,0.4)',
          strokeColor: '#a495b2',
          strokeThickness: 2
        },
        "option":{
          entityType: 'PopulatedPlace'
        }
      }
    })
  }
  handleSubmit(event){
    if(this.state.searchInput !== null && this.state.searchInput !== ""){
      this.setState({
        boundary: {
          "search" : this.state.searchInput,
          "polygonStyle" :{
            fillColor: 'rgba(161,224,255,0.4)',
            strokeColor: '#a495b2',
            strokeThickness: 2
          },
          "option":{
            entityType: 'PopulatedPlace'
          }
        }
      })
    }
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h1><u>Example React-Bingmaps</u></h1>
        <div>
          <button onClick={this.changeState.bind(this)}>Change State</button>
          <button onClick={()=>{this.setState({isVisible:!this.state.isVisible})}}>
            {this.state.isVisible ? "Hide" : "Show"}
          </button>
          <a target="_blank" href="https://github.com/iniamudhan/react-bingmaps/blob/dev/src/App.js">source</a>
        </div>
        {this.state.isVisible && (<div>
          <div className = "map-one">
          <u>Bingmaps with Center set and zoom = 5</u>
            <ReactBingmaps 
              id = "one"
              bingmapKey = {this.state.bingmapKey} 
              center = {[13.0827, 80.2707]}
              zoom = {4}
              className = "customClass"
            > 
            </ReactBingmaps>
          </div>
          <div className = "map-two">
          <u>Bingmaps with Pushpin</u>
            <ReactBingmaps
              id = "two" 
              className = "customClass"
              bingmapKey = {this.state.bingmapKey}
              center = {[13.0827, 80.2707]}
              mapTypeId = {"aerial"}
              pushPins = { this.state.pushPins }
            > 
            </ReactBingmaps>
          </div>
          <div className = "map-one">
          <u>Bingmaps with Infobox</u>
            <ReactBingmaps 
              id = "three"
              className = "customClass"
              bingmapKey = {this.state.bingmapKey} 
              infoboxes = {this.state.infoboxes }
            > 
            </ReactBingmaps>
          </div>
          <div className = "map-two">
          <u>Bingmaps with Infobox and Pushpin</u>
            <ReactBingmaps 
              id = "four"
              className = "customClass"
              bingmapKey = {this.state.bingmapKey} 
              infoboxesWithPushPins = {this.state.infoboxesWithPushPins}
            > 
            </ReactBingmaps>
          </div>
          <div className = "map-one">
          <u>Bingmaps with Regular Polygons</u>
            <ReactBingmaps
              id = "five" 
              className = "customClass"
              bingmapKey = {this.state.bingmapKey}
              regularPolygons = {this.state.regularPolygons}
            > 
            </ReactBingmaps>
          </div>
          <div className = "map-two">
          <u>Bingmaps with Spatial Data Service (Boundary)</u>
            <span style={{'display':'inline-block'}}>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="search place, pin, city"
                  onChange={(event)=>{this.setState({searchInput:event.target.value})}} 
                  value={this.state.searchInput}>
                </input>
                <input type="submit" value="Search" />
              </form>
            </span>
            <ReactBingmaps
              className = "customClass"
              id = "six" 
              bingmapKey = {this.state.bingmapKey}
              boundary = {this.state.boundary}
            > 
            </ReactBingmaps>
          </div>
        </div>)}
        <h3>For new feature to be added, open new issue <a href="https://github.com/iniamudhan/react-bingmaps/issues/new">here</a>. Thanks</h3>
      </div>
    );
  }
}

export default App;
