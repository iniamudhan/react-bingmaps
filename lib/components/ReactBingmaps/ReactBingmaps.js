'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

require('./ReactBingmaps.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var map,
    Microsoft,
    infobox = {};

var ReactBingmaps = function (_Component) {
	_inherits(ReactBingmaps, _Component);

	function ReactBingmaps() {
		_classCallCheck(this, ReactBingmaps);

		return _possibleConstructorReturn(this, (ReactBingmaps.__proto__ || Object.getPrototypeOf(ReactBingmaps)).apply(this, arguments));
	}

	_createClass(ReactBingmaps, [{
		key: 'componentDidMount',

		// constructor(props) {
		// 	super(props);
		// }
		value: function componentDidMount() {
			window.bingmapsCallback = function () {
				Microsoft = window.Microsoft;
				this.reactBingmaps(this.props, Microsoft);
			}.bind(this);

			if (Microsoft === null || Microsoft === undefined) {
				this.loadScript("https://www.bing.com/api/maps/mapcontrol?callback=bingmapsCallback");
			} else {
				this.reactBingmaps(this.props, Microsoft);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.center !== nextProps.center) {
				this.setMapCenter(nextProps.center);
			}
			if (this.props.zoom !== nextProps.zoom) {
				this.setMapZoom(nextProps.zoom);
			}
			if (this.props.mapTypeId !== nextProps.mapTypeId) {
				this.setMapTypeId(nextProps.mapTypeId, nextProps.center, nextProps.heading);
			}
			if (this.props.navigationBarMode !== nextProps.navigationBarMode) {
				this.setMapNavigationBarMode(nextProps.navigationBarMode);
			}
			if (this.props.supportedMapTypes !== nextProps.supportedMapTypes) {
				this.setMapSupportedMapTypes(nextProps.supportedMapTypes);
			}
			if (this.props.disableStreetside !== nextProps.disableStreetside) {
				this.setDisableStreetside(nextProps.disableStreetside);
			}
			if (this.props.pushPins !== nextProps.pushPins) {
				this.setPushPins(nextProps.pushPins);
			}
			if (this.props.infoboxes !== nextProps.infoboxes) {
				this.setInfoboxes(nextProps.infoboxes, "infoboxes");
			}
			if (this.props.infoboxesWithPushPins !== nextProps.infoboxesWithPushPins) {
				this.setInfoboxesWithPushPins(nextProps.infoboxesWithPushPins, "infoboxesWithPushPins");
			}
			if (this.props.regularPolygons !== nextProps.regularPolygons) {
				this.createRegularPolygons(nextProps.regularPolygons);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (map) map.dispose();

			map = undefined;
			infobox = {};
		}
	}, {
		key: 'loadScript',
		value: function loadScript(url) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.async = true;
			script.defer = true;
			script.src = url;
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	}, {
		key: 'reactBingmaps',
		value: function reactBingmaps(props, Microsoft) {
			var bingmapKey = props.bingmapKey,
			    center = props.center,
			    mapTypeId = props.mapTypeId,
			    zoom = props.zoom,
			    navigationBarMode = props.navigationBarMode,
			    supportedMapTypes = props.supportedMapTypes,
			    heading = props.heading,
			    pushPins = props.pushPins,
			    disableStreetside = props.disableStreetside,
			    infoboxes = props.infoboxes,
			    infoboxesWithPushPins = props.infoboxesWithPushPins,
			    getLocation = props.getLocation,
			    regularPolygons = props.regularPolygons;

			if (bingmapKey && Microsoft) {
				if (!map) {
					map = new Microsoft.Maps.Map('.react-bingmaps', {
						credentials: bingmapKey
					});
				}
				this.setMapCenter(center);
				this.setMapTypeId(mapTypeId, center, heading);
				this.setMapZoom(zoom);
				this.setMapNavigationBarMode(navigationBarMode);
				this.setMapSupportedMapTypes(supportedMapTypes);
				this.setDisableStreetside(disableStreetside);
				this.setPushPins(pushPins);
				this.setInfoboxes(infoboxes, "infoboxes");
				this.setInfoboxesWithPushPins(infoboxesWithPushPins, "infoboxesWithPushPins");
				this.setGetLocation(getLocation);
				this.createRegularPolygons(regularPolygons);
			}
		}
	}, {
		key: 'setMapCenter',
		value: function setMapCenter(center) {
			if (map && center && center[0] && center[1]) {
				map.setView({
					center: new Microsoft.Maps.Location(center[0], center[1])
				});
			}
		}
	}, {
		key: 'setMapTypeId',
		value: function setMapTypeId(mapTypeId, center, heading) {
			if (map && mapTypeId) {
				var isBirdEyeAvailable = false;
				if (mapTypeId === "birdseye" && center && center[0] && center[1]) {
					var location = new Microsoft.Maps.Location(center[0], center[1]);
					Microsoft.Maps.getIsBirdseyeAvailable(location, Microsoft.Maps.Heading[heading], function (onResponse) {
						isBirdEyeAvailable = onResponse;
					});
				}
				if (mapTypeId) {
					map.setView({
						mapTypeId: isBirdEyeAvailable ? Microsoft.Maps.MapTypeId.birdseye : Microsoft.Maps.MapTypeId[mapTypeId]
					});
				}
			}
		}
	}, {
		key: 'setMapZoom',
		value: function setMapZoom(zoom) {
			if (map && zoom) {
				map.setView({
					zoom: zoom
				});
			}
		}
	}, {
		key: 'setMapNavigationBarMode',
		value: function setMapNavigationBarMode(navigationBarMode) {
			if (map && navigationBarMode) {
				map.setView({
					navigationBarMode: navigationBarMode
				});
			}
		}
	}, {
		key: 'setMapSupportedMapTypes',
		value: function setMapSupportedMapTypes(supportedMapTypes) {
			if (map && supportedMapTypes) {
				map.setView({
					supportedMapTypes: supportedMapTypes.map(function (id) {
						return Microsoft.Maps.MapTypeId[id];
					})
				});
			}
		}
	}, {
		key: 'setDisableStreetside',
		value: function setDisableStreetside(disableStreetside) {
			if (map && disableStreetside) {
				map.setView({
					disableStreetside: disableStreetside
				});
			}
		}
	}, {
		key: 'setPushPins',
		value: function setPushPins(pushPins) {
			if (map && pushPins) {
				for (var i = map.entities.getLength() - 1; i >= 0; i--) {
					var pushpin = map.entities.get(i);
					if (pushpin instanceof Microsoft.Maps.Pushpin) {
						map.entities.removeAt(i);
					}
				}
				for (var pushPinIndex = 0; pushPinIndex < pushPins.length; pushPinIndex++) {
					if (pushPins[pushPinIndex].location && pushPins[pushPinIndex].location[0] && pushPins[pushPinIndex].location[1]) {
						var location = new Microsoft.Maps.Location(pushPins[pushPinIndex].location[0], pushPins[pushPinIndex].location[1]);
						var option = pushPins[pushPinIndex].option ? pushPins[pushPinIndex].option : null;
						if (option && option.anchor && option.anchor[0] && option.anchor[1]) {
							option.anchor = new Microsoft.Maps.Point(option.anchor[0], option.anchor[1]);
						}
						var _pushpin = new Microsoft.Maps.Pushpin(location, option);
						map.entities.push(_pushpin);
						if (pushPins[pushPinIndex].addHandler) {
							Microsoft.Maps.Events.addHandler(_pushpin, pushPins[pushPinIndex].addHandler.type, function (callback, data) {
								this.MakeCallback(callback, data);
							}.bind(this, pushPins[pushPinIndex].addHandler.callback, pushPins[pushPinIndex].addHandler.callbackData));
						}
					}
				}
			}
		}
	}, {
		key: 'setInfoboxes',
		value: function setInfoboxes(infoboxes, infoboxCreateType) {
			if (map && infoboxes) {
				for (var i = 0; infobox[infoboxCreateType] && i < infobox[infoboxCreateType].length; i++) {
					infobox[infoboxCreateType][i].setMap(null);
				}
				infobox[infoboxCreateType] = [];
				if (infoboxes) {
					for (var infoboxIndex = 0; infoboxIndex < infoboxes.length; infoboxIndex++) {
						if (infoboxes[infoboxIndex].location && infoboxes[infoboxIndex].location[0] && infoboxes[infoboxIndex].location[1]) {
							var location = new Microsoft.Maps.Location(infoboxes[infoboxIndex].location[0], infoboxes[infoboxIndex].location[1]);
							var option = infoboxes[infoboxIndex] ? infoboxes[infoboxIndex].option : null;
							if (option.htmlContent) {
								option.htmlContent = _server2.default.renderToStaticMarkup(option.htmlContent);
							}
							infobox[infoboxCreateType].push(new Microsoft.Maps.Infobox(location, option));
							infobox[infoboxCreateType][infoboxIndex].setMap(map);
							if (infoboxes[infoboxIndex].addHandler) {
								Microsoft.Maps.Events.addHandler(infobox[infoboxCreateType][infoboxIndex], infoboxes[infoboxIndex].addHandler.type, function (callback, data) {
									this.MakeCallback(callback, data);
								}.bind(this, infoboxes[infoboxIndex].addHandler.callback, infoboxes[infoboxIndex].addHandler.callbackData));
							}
						}
					}
				}
			}
		}
	}, {
		key: 'setInfoboxesWithPushPins',
		value: function setInfoboxesWithPushPins(infoboxesWithPushPins, infoboxCreateType) {
			if (map && infoboxesWithPushPins) {
				//Remove existing Infoboxes
				var i;
				for (i = 0; infobox[infoboxCreateType] && i < infobox[infoboxCreateType].length; i++) {
					infobox[infoboxCreateType][i].setMap(null);
				}

				//Remove existing Pushpins
				for (i = map.entities.getLength() - 1; i >= 0; i--) {
					var pushpin = map.entities.get(i);
					if (pushpin instanceof Microsoft.Maps.Pushpin) {
						map.entities.removeAt(i);
					}
				}

				infobox[infoboxCreateType] = [];

				//Add Infoboxes with Pushpins
				if (infoboxesWithPushPins) {
					for (var infoboxWithPushPinIndex = 0; infoboxWithPushPinIndex < infoboxesWithPushPins.length; infoboxWithPushPinIndex++) {
						if (infoboxesWithPushPins[infoboxWithPushPinIndex].location) {
							//Set Location
							var location = new Microsoft.Maps.Location(infoboxesWithPushPins[infoboxWithPushPinIndex].location[0], infoboxesWithPushPins[infoboxWithPushPinIndex].location[1]);

							//Set Infobox Option
							var infoboxOption = infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxOption ? infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxOption : null;

							//ConvertToHtml if Obj
							if (infoboxOption.htmlContent) {
								infoboxOption.htmlContent = _server2.default.renderToStaticMarkup(infoboxOption.htmlContent);
							}

							//If Handler added, initially hide Infobox
							if (infoboxesWithPushPins[infoboxWithPushPinIndex].addHandler) {
								infoboxOption["visible"] = false;
							}

							//Set Pushpin Option
							var pushPinOption = infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinOption ? infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinOption : null;

							//Initilize if anchor for Pushpin
							if (pushPinOption.anchor && pushPinOption.anchor[0] && pushPinOption.anchor[1]) {
								pushPinOption.anchor = new Microsoft.Maps.Point(pushPinOption.anchor[0], pushPinOption.anchor[1]);
							}

							//Set Infobox
							infobox[infoboxCreateType].push(new Microsoft.Maps.Infobox(location, infoboxOption));
							infobox[infoboxCreateType][infoboxWithPushPinIndex].setMap(map);

							//Set Infobox Callback if any
							if (infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler) {
								Microsoft.Maps.Events.addHandler(infobox[infoboxCreateType][infoboxWithPushPinIndex], infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler.type, function (callback, data) {
									this.MakeCallback(callback, data);
								}.bind(this, infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler.callback, infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler.callbackData));
							}

							//Set Pushpin				
							var _pushpin2 = new Microsoft.Maps.Pushpin(location, pushPinOption);
							map.entities.push(_pushpin2);

							//Set Pushpin Callback if any
							if (infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinAddHandler) {
								Microsoft.Maps.Events.addHandler(_pushpin2, infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinAddHandler.type, function (callback, data) {
									this.MakeCallback(callback, data);
								}.bind(this, infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinAddHandler.callback, infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinAddHandler.callbackData));
							}

							//Set InfoboxesWithPushPins handler if any
							if (infoboxesWithPushPins[infoboxWithPushPinIndex].addHandler) {
								this.setInfoboxesWithPushPinsHandler(infobox[infoboxCreateType][infoboxWithPushPinIndex], _pushpin2, infoboxesWithPushPins[infoboxWithPushPinIndex].addHandler);
							}
						}
					}
				}
			}
		}
	}, {
		key: 'setGetLocation',
		value: function setGetLocation(getLocation) {
			if (map && getLocation) {
				if (getLocation.addHandler) {
					Microsoft.Maps.Events.addHandler(map, getLocation.addHandler, function (callback, e) {
						var point = new Microsoft.Maps.Point(e.getX(), e.getY());
						var location = e.target.tryPixelToLocation(point);
						this.MakeCallback(callback, location);
					}.bind(this, getLocation.callback));
				} else {
					Microsoft.Maps.Events.addHandler(map, "click", function (callback, e) {
						var point = new Microsoft.Maps.Point(e.getX(), e.getY());
						var location = e.target.tryPixelToLocation(point);
						this.MakeCallback(callback, location);
					}.bind(this, getLocation.callback));
				}
			}
		}
	}, {
		key: 'setInfoboxesWithPushPinsHandler',
		value: function setInfoboxesWithPushPinsHandler(infobox, pushpin, addHandler) {
			if (addHandler === "mouseover") {
				Microsoft.Maps.Events.addHandler(pushpin, addHandler, function () {
					infobox.setOptions({ visible: true });
				});
				Microsoft.Maps.Events.addHandler(pushpin, "mouseout", function () {
					infobox.setOptions({ visible: false });
				});
			} else {
				Microsoft.Maps.Events.addHandler(pushpin, addHandler, function () {
					infobox.setOptions({ visible: true });
				});
			}
		}
	}, {
		key: 'MakeCallback',
		value: function MakeCallback(callback, data) {
			data ? callback(data) : callback();
		}
	}, {
		key: 'createRegularPolygons',
		value: function createRegularPolygons(regularPolygons) {
			if (map && regularPolygons) {
				for (var i = map.entities.getLength() - 1; i >= 0; i--) {
					var regularPolygon = map.entities.get(i);
					if (regularPolygon instanceof Microsoft.Maps.Polygon) {
						map.entities.removeAt(i);
					}
				}
				for (var regularPolygonIndex = 0; regularPolygonIndex < regularPolygons.length; regularPolygonIndex++) {
					if (regularPolygons[regularPolygonIndex].center && regularPolygons[regularPolygonIndex].center[0] && regularPolygons[regularPolygonIndex].center[1]) {
						(function () {
							var location = new Microsoft.Maps.Location(regularPolygons[regularPolygonIndex].center[0], regularPolygons[regularPolygonIndex].center[1]);
							var radius = regularPolygons[regularPolygonIndex].radius ? regularPolygons[regularPolygonIndex].radius : 0;
							var points = regularPolygons[regularPolygonIndex].points ? regularPolygons[regularPolygonIndex].points : 0;
							var option = regularPolygons[regularPolygonIndex].option ? regularPolygons[regularPolygonIndex].option : {};

							Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function () {
								var locations = Microsoft.Maps.SpatialMath.getRegularPolygon(location, radius, points, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
								var polygon = new Microsoft.Maps.Polygon(locations, option);
								map.entities.push(polygon);
							});
						})();
					}
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { className: (0, _classnames2.default)('react-bingmaps', this.props.className) });
		}
	}]);

	return ReactBingmaps;
}(_react.Component);

exports.default = ReactBingmaps;


ReactBingmaps.propTypes = {
	bingmapKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	center: _propTypes2.default.arrayOf(_propTypes2.default.number),
	mapTypeId: _propTypes2.default.string,
	navigationBarMode: _propTypes2.default.string,
	supportedMapTypes: _propTypes2.default.arrayOf(_propTypes2.default.string),
	heading: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	zoom: _propTypes2.default.number,
	pushPins: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		location: _propTypes2.default.arrayOf(_propTypes2.default.number),
		option: _propTypes2.default.object,
		addHandler: _propTypes2.default.shape({
			"type": _propTypes2.default.string,
			"callback": _propTypes2.default.func
		})
	})),
	disableStreetside: _propTypes2.default.bool,
	infoboxes: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		location: _propTypes2.default.arrayOf(_propTypes2.default.number),
		option: _propTypes2.default.object,
		addHandler: _propTypes2.default.shape({
			"type": _propTypes2.default.string,
			"callback": _propTypes2.default.func
		})
	})),
	infoboxesWithPushPins: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		location: _propTypes2.default.arrayOf(_propTypes2.default.number),
		addHandler: _propTypes2.default.string,
		infoboxOption: _propTypes2.default.object,
		pushPinOption: _propTypes2.default.object,
		infoboxAddHandler: _propTypes2.default.shape({
			"type": _propTypes2.default.string,
			"callback": _propTypes2.default.func
		}),
		pushPinAddHandler: _propTypes2.default.shape({
			"type": _propTypes2.default.string,
			"callback": _propTypes2.default.func
		})
	})),
	getLocation: _propTypes2.default.object,
	regularPolygons: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		center: _propTypes2.default.arrayOf(_propTypes2.default.number),
		radius: _propTypes2.default.number,
		points: _propTypes2.default.number,
		option: _propTypes2.default.object
	}))
};
ReactBingmaps.defaultProps = {
	bingmapKey: undefined,
	center: undefined,
	mapTypeId: undefined,
	navigationBarMode: undefined,
	supportedMapTypes: undefined,
	heading: 0,
	pushPins: undefined,
	disableStreetside: true,
	infoboxes: undefined,
	infoboxesWithPushPins: undefined,
	zoom: undefined,
	getLocation: undefined,
	regularPolygons: undefined
};