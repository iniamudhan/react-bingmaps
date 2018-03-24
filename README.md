# React-Bingmaps
## Introduction
React-Bingmaps is a react.js version of [Bing Maps V8 Web Control](https://msdn.microsoft.com/en-us/library/mt712542.aspx)

The main purpose of this version is to help you to write Bingmaps in React applications without any pain. Main principles of React-Bingmaps are:
1. **Simply** deploy with React components
1. **Lightweight**  depending on Bing Maps V8 Web Control

## Installation

### npm

NPM is the easiest and fastest way to get started using React-Bingmaps.


```sh
# latest stable
$ npm i react-bingmaps
```

## Examples

```jsx
<ReactBingmaps 
  bingmapKey = "[YourBingMapsKey]"
  center = {[45.464210, 9.190396]}
  zoom = {5}
  mapTypeId = {"road"}
  navigationBarMode = {"compact"}
  supportedMapTypes = {["road","canvasDark"]}
  >
</ReactBingmaps>
```

## Contribution

We would love to hear what you think we should build. Please create an issue to write your usage or ideas.

We are looking for like-minded people who share the same idea about React-Bingmaps. The goal of this project is create a more flexible Bingmaps library for the  React community.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) React-Bingmaps
