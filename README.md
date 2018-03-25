# React-Bingmaps
## Introduction
React-Bingmaps is a react.js version of [Bing Maps V8 Web Control](https://msdn.microsoft.com/en-us/library/mt712542.aspx)

The main purpose of this version is to help you to write Bingmaps in React applications without any pain. Main principles of React-Bingmaps are:
1. **Simply** deploy with React components
1. **Lightweight**  depending on Bing Maps V8 Web Control

## Features
* Bingmaps in React.js
* Multiple Pushpin
* Multiple Infobox
* Multiple Pushpin with Infobox
* Callback events in Pushpins and Infoboxes
* Map types
* Disable Street View
* Zoom

## Installation

### npm

NPM is the easiest and fastest way to get started using React-Bingmaps.


```sh
# latest stable
$ npm i react-bingmaps
```

### Import Module
To use react-bootstrap-table in your react app, you should import it first. You can do by

```jsx
import { ReactBingmaps } from 'react-bingmaps';
```

## Examples
#### Bingmaps
Follow [Bing Maps Dev Center](http://https://www.bingmapsportal.com/) to get your Bingmaps key 
```jsx
<ReactBingmaps 
  bingmapKey = "[YourBingMapsKey]" > 
</ReactBingmaps>
```

#### Map center with loaction
```jsx
<ReactBingmaps 
  bingmapKey = "[YourBingMapsKey]" 
  center = {[13.0827, 80.2707]}
  > 
</ReactBingmaps>
```

![Alt text](/src/example/PinPointWithInfobox.png?raw=true "PinPointWithInfobox")

## Other props
##### mapTypeId : string
```jsx
mapTypeId: {"road"}
```
Find more map types - [MapTypeId Enumeration](https://msdn.microsoft.com/en-us/library/mt712700.aspx)

#### navigationBarMode : string
```jsx
navigationBarMode = {"compact"}
```
Find more NavigationBar Mode - [NavigationBarMode Enumeration
](https://msdn.microsoft.com/en-us/library/mt736390.aspx)
#### supportedMapTypes : string[]
```jsx
supportedMapTypes = {["road","canvasDark"]}
```
Find more Supported Map Types Mode - [MapTypeId Enumeration](https://msdn.microsoft.com/en-us/library/mt712700.aspx)

#### supportedMapTypes : string[]
```jsx
supportedMapTypes = {["road","canvasDark"]}
```
Find more Supported Map Types Mode - [MapTypeId Enumeration](https://msdn.microsoft.com/en-us/library/mt712700.aspx)

#### heading : oneOfType([ string, number ])  
**Note:** Available only for map mode - **BirdView** 
```jsx
heading = {180}
```
#### zoom : number
```jsx
zoom = {5}
```
#### disableStreetside : bool
```jsx
disableStreetside={true}
```

#### pushPins : ArrayOf(objects)
```jsx
pushPins = {
            [
              {"location":[13.0827, 80.2707], "option":{ color: 'red' }, "addHandler": {"type" : "click", callback: this.callBackMethod }}
            ],
          [
          ...
          ]
          }
```
Find more **option** values - [Pushpin](https://msdn.microsoft.com/en-us/library/mt712679.aspx)
addHandler types - ["click", "mousedown", "mouseout", "mouseup", "mouseover"]

#### infoboxes : ArrayOf(objects)
```jsx
infoboxes = {
            [
              {"location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: '...' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
              }
            ],
          [
          ...
          ]
          }
```
Find more **option** values - [Infobox](https://msdn.microsoft.com/en-us/library/mt750270.aspx)
addHandler types - ["click", "mouseenter", "mouseleave"]
#### infoboxesWithPushPins : ArrayOf(objects)
```jsx
infoboxesWithPushPins = {[
            {
              "location":[13.0827, 80.2707], 
              "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
              "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
              "pushPinOption":{ title: 'Pushpin Title', description: 'Pushpin' },
              "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
              "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
            }
          ],
          [
          ...
          ]
          }
```


## Contribution

We would love to hear what you think we should build. Please create an issue to write your usage or ideas.

We are looking for like-minded people who share the same idea about React-Bingmaps. The goal of this project is create a more flexible Bingmaps library for the  React community.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) React-Bingmaps