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

var map = {},
    Microsoft,
    infobox = {},
    scriptURL = "https://www.bing.com/api/maps/mapcontrol?callback=bingmapsCallback",
    pendingProps = [];

var ReactBingmaps = function (_Component) {
	_inherits(ReactBingmaps, _Component);

	function ReactBingmaps(props) {
		_classCallCheck(this, ReactBingmaps);

		var _this = _possibleConstructorReturn(this, (ReactBingmaps.__proto__ || Object.getPrototypeOf(ReactBingmaps)).call(this, props));

		if (document.querySelector('script[src="' + scriptURL + '"]') === null) {
			_this.loadScript(scriptURL);
			window.bingmapsCallback = function () {
				Microsoft = window.Microsoft;
				this.afterDependencyLoad(pendingProps);
			}.bind(_this);
		}
		return _this;
	}

	_createClass(ReactBingmaps, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (Microsoft === null || Microsoft === undefined) {
				pendingProps.push(this.props);
			} else {
				this.reactBingmaps(this.props, Microsoft);
			}
		}
	}, {
		key: 'afterDependencyLoad',
		value: function afterDependencyLoad(pendingProps) {
			var _this2 = this;

			try {
				pendingProps.map(function (props) {
					return _this2.reactBingmaps(props, Microsoft);
				});
			} catch (exception) {
				console.log("Error loading Microsoft bingmaps");
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			try {
				var mapReference = this.props.id ? '#' + this.props.id : '.react-bingmaps';
				if (map[mapReference])
					//map[mapReference].dispose();

					map[mapReference] = undefined;
				infobox = {};
				pendingProps = [];
			} catch (exception) {
				console.log(exception);
			}
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
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var mapReference = nextProps.id ? '#' + nextProps.id : '.react-bingmaps';
			if (this.props.center.join() !== nextProps.center.join()) {
				this.setMapCenter(nextProps.center, mapReference);
			}
			if (this.props.zoom !== nextProps.zoom) {
				this.setMapZoom(nextProps.zoom, mapReference);
			}
			if (this.props.mapTypeId !== nextProps.mapTypeId) {
				this.setMapTypeId(nextProps.mapTypeId, nextProps.center, nextProps.heading, mapReference);
			}
			if (this.props.navigationBarMode !== nextProps.navigationBarMode) {
				this.setMapNavigationBarMode(nextProps.navigationBarMode, mapReference);
			}
			if (this.props.supportedMapTypes !== nextProps.supportedMapTypes) {
				this.setMapSupportedMapTypes(nextProps.supportedMapTypes, mapReference);
			}
			if (this.props.disableStreetside !== nextProps.disableStreetside) {
				this.setDisableStreetside(nextProps.disableStreetside, mapReference);
			}
			if (this.props.pushPins !== nextProps.pushPins) {
				this.setPushPins(nextProps.pushPins, mapReference);
			}
			if (this.props.infoboxes !== nextProps.infoboxes) {
				this.setInfoboxes(nextProps.infoboxes, "infoboxes", mapReference);
			}
			if (this.props.infoboxesWithPushPins !== nextProps.infoboxesWithPushPins) {
				this.setInfoboxesWithPushPins(nextProps.infoboxesWithPushPins, "infoboxesWithPushPins", mapReference);
			}
			if (this.props.regularPolygons !== nextProps.regularPolygons) {
				this.createRegularPolygons(nextProps.regularPolygons, mapReference);
			}
			if (this.props.boundary !== nextProps.boundary) {
				this.setBoundary(nextProps.boundary, mapReference);
			}
			if (this.props.mapOptions !== nextProps.mapOptions) {
				this.setMapOptions(nextProps.mapOptions, mapReference);
			}
			if (this.props.polyline !== nextProps.polyline) {
				this.setPolyline(nextProps.polyline, mapReference);
			}
			if (this.props.directions !== nextProps.directions) {
				this.setDirections(nextProps.directions, mapReference);
			}
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
			    regularPolygons = props.regularPolygons,
			    boundary = props.boundary,
			    mapOptions = props.mapOptions,
			    polyline = props.polyline,
			    directions = props.directions,
			    mapHandlers = props.mapHandlers;

			if (bingmapKey && Microsoft) {
				var mapReference = props.id ? '#' + props.id : '.react-bingmaps';
				if (!map[mapReference]) {
					map[mapReference] = new Microsoft.Maps.Map(mapReference, {
						credentials: bingmapKey
					});
				}
				this.setMapCenter(center, mapReference);
				this.setMapTypeId(mapTypeId, center, heading, mapReference);
				this.setMapZoom(zoom, mapReference);
				this.setMapNavigationBarMode(navigationBarMode, mapReference);
				this.setMapSupportedMapTypes(supportedMapTypes, mapReference);
				this.setDisableStreetside(disableStreetside, mapReference);
				this.setPushPins(pushPins, mapReference);
				this.setInfoboxes(infoboxes, "infoboxes", mapReference);
				this.setInfoboxesWithPushPins(infoboxesWithPushPins, "infoboxesWithPushPins", mapReference);
				this.setGetLocation(getLocation, mapReference);
				this.createRegularPolygons(regularPolygons, mapReference);
				this.setBoundary(boundary, mapReference);
				this.setMapOptions(mapOptions, mapReference);
				this.setPolyline(polyline, mapReference);
				this.setDirections(directions, mapReference);
				this.setMapHandlers(mapHandlers, mapReference);
			}
		}
	}, {
		key: 'setMapCenter',
		value: function setMapCenter(center, mapReference) {
			if (map[mapReference] && center && center[0] && center[1]) {
				map[mapReference].setView({
					center: new Microsoft.Maps.Location(center[0], center[1])
				});
			}
		}
	}, {
		key: 'setMapTypeId',
		value: function setMapTypeId(mapTypeId, center, heading, mapReference) {
			if (map[mapReference] && mapTypeId) {
				var isBirdEyeAvailable = false;
				if (mapTypeId === "birdseye" && center && center[0] && center[1]) {
					var location = new Microsoft.Maps.Location(center[0], center[1]);
					Microsoft.Maps.getIsBirdseyeAvailable(location, Microsoft.Maps.Heading[heading], function (onResponse) {
						isBirdEyeAvailable = onResponse;
					});
				}
				if (mapTypeId) {
					map[mapReference].setView({
						mapTypeId: isBirdEyeAvailable ? Microsoft.Maps.MapTypeId.birdseye : Microsoft.Maps.MapTypeId[mapTypeId]
					});
				}
			}
		}
	}, {
		key: 'setMapZoom',
		value: function setMapZoom(zoom, mapReference) {
			if (map[mapReference] && zoom) {
				map[mapReference].setView({
					zoom: zoom
				});
			}
		}
	}, {
		key: 'setMapNavigationBarMode',
		value: function setMapNavigationBarMode(navigationBarMode, mapReference) {
			if (map[mapReference] && navigationBarMode) {
				map[mapReference].setView({
					navigationBarMode: navigationBarMode
				});
			}
		}
	}, {
		key: 'setMapSupportedMapTypes',
		value: function setMapSupportedMapTypes(supportedMapTypes, mapReference) {
			if (map[mapReference] && supportedMapTypes) {
				map[mapReference].setView({
					supportedMapTypes: supportedMapTypes.map(function (id) {
						return Microsoft.Maps.MapTypeId[id];
					})
				});
			}
		}
	}, {
		key: 'setDisableStreetside',
		value: function setDisableStreetside(disableStreetside, mapReference) {
			if (map[mapReference] && disableStreetside) {
				map[mapReference].setView({
					disableStreetside: disableStreetside
				});
			}
		}
	}, {
		key: 'setPushPins',
		value: function setPushPins(pushPins, mapReference) {
			if (map[mapReference] && pushPins) {
				for (var i = map[mapReference].entities.getLength() - 1; i >= 0; i--) {
					var pushpin = map[mapReference].entities.get(i);
					if (pushpin instanceof Microsoft.Maps.Pushpin) {
						map[mapReference].entities.removeAt(i);
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
						map[mapReference].entities.push(_pushpin);
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
		value: function setInfoboxes(infoboxes, infoboxCreateType, mapReference) {
			if (map[mapReference] && infoboxes) {
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
							infobox[infoboxCreateType][infoboxIndex].setMap(map[mapReference]);
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
		value: function setInfoboxesWithPushPins(infoboxesWithPushPins, infoboxCreateType, mapReference) {
			if (map[mapReference] && infoboxesWithPushPins) {
				//Remove existing Infoboxes
				var i;
				for (i = 0; infobox[infoboxCreateType] && i < infobox[infoboxCreateType].length; i++) {
					infobox[infoboxCreateType][i].setMap(null);
				}

				//Remove existing Pushpins
				for (i = map[mapReference].entities.getLength() - 1; i >= 0; i--) {
					var pushpin = map[mapReference].entities.get(i);
					if (pushpin instanceof Microsoft.Maps.Pushpin) {
						map[mapReference].entities.removeAt(i);
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
							infobox[infoboxCreateType][infoboxWithPushPinIndex].setMap(map[mapReference]);

							//Set Infobox Callback if any
							if (infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler) {
								Microsoft.Maps.Events.addHandler(infobox[infoboxCreateType][infoboxWithPushPinIndex], infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler.type, function (callback, data) {
									this.MakeCallback(callback, data);
								}.bind(this, infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler.callback, infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler.callbackData));
							}

							//Set Pushpin				
							var _pushpin2 = new Microsoft.Maps.Pushpin(location, pushPinOption);
							map[mapReference].entities.push(_pushpin2);

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
		value: function setGetLocation(getLocation, mapReference) {
			if (map[mapReference] && getLocation) {
				if (getLocation.addHandler) {
					Microsoft.Maps.Events.addHandler(map[mapReference], getLocation.addHandler, function (callback, e) {
						if (typeof e.getX !== "undefined" && typeof e.getY !== "undefined") {
							var point = new Microsoft.Maps.Point(e.getX(), e.getY());
							var location = e.target.tryPixelToLocation(point);
							this.MakeCallback(callback, location);
						} else {
							this.MakeCallback(callback, "Event: " + getLocation.addHandler);
						}
					}.bind(this, getLocation.callback));
				} else {
					Microsoft.Maps.Events.addHandler(map[mapReference], "click", function (callback, e) {
						if (typeof e.getX !== "undefined" && typeof e.getY !== "undefined") {
							var point = new Microsoft.Maps.Point(e.getX(), e.getY());
							var location = e.target.tryPixelToLocation(point);
							this.MakeCallback(callback, location);
						} else {
							this.MakeCallback(callback, "Event: " + getLocation.addHandler);
						}
					}.bind(this, getLocation.callback));
				}
			}
		}
	}, {
		key: 'setInfoboxesWithPushPinsHandler',
		value: function setInfoboxesWithPushPinsHandler(infobox, pushpin, addHandler, mapReference) {
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
		value: function MakeCallback(callback, data, mapReference) {
			data ? callback(data) : callback();
		}
	}, {
		key: 'createRegularPolygons',
		value: function createRegularPolygons(regularPolygons, mapReference) {
			if (map[mapReference] && regularPolygons) {
				for (var i = map[mapReference].entities.getLength() - 1; i >= 0; i--) {
					var regularPolygon = map[mapReference].entities.get(i);
					if (regularPolygon instanceof Microsoft.Maps.Polygon) {
						map[mapReference].entities.removeAt(i);
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
								map[mapReference].entities.push(polygon);
							});
						})();
					}
				}
			}
		}
	}, {
		key: 'setBoundary',
		value: function setBoundary(boundary, mapReference) {
			if (map[mapReference] && boundary) {

				for (var i = map[mapReference].entities.getLength() - 1; i >= 0; i--) {
					var regularPolygon = map[mapReference].entities.get(i);
					if (regularPolygon instanceof Microsoft.Maps.Polygon) {
						map[mapReference].entities.removeAt(i);
					}
				}

				// var boundaryLocation;
				// if(boundary.option && 
				// 	boundary.option.entityType && 
				// 		!(boundary.option.entityType.includes("Postcode"))){
				// 	boundaryLocation = new Microsoft.Maps.Location(boundary.location[0], boundary.location[1]);
				// }
				// else{
				// 	boundaryLocation = boundary.location
				// }

				var boundaryLocation = boundary.location ? boundary.location : null;

				var geoDataRequestOptions = boundary.option ? boundary.option : {};
				var polygonStyle = boundary.polygonStyle ? boundary.polygonStyle : null;
				var search = boundary.search ? boundary.search : null;
				if (!search && boundaryLocation) {
					Microsoft.Maps.loadModule('Microsoft.Maps.SpatialDataService', function () {
						Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(boundaryLocation, geoDataRequestOptions, map[mapReference], function (data) {
							if (data.results && data.results.length > 0) {
								map[mapReference].entities.push(data.results[0].Polygons);
							}
						}, polygonStyle, function errCallback(networkStatus, statusMessage) {
							console.log(networkStatus);
							console.log(statusMessage);
						});
					});
				} else {
					Microsoft.Maps.loadModule(['Microsoft.Maps.SpatialDataService', 'Microsoft.Maps.Search'], function () {
						var searchManager = new Microsoft.Maps.Search.SearchManager(map[mapReference]);
						var geocodeRequest = {
							where: search,
							callback: function callback(geocodeResult) {
								if (geocodeResult && geocodeResult.results && geocodeResult.results.length > 0) {
									map[mapReference].setView({ bounds: geocodeResult.results[0].bestView });
									Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(geocodeResult.results[0].location, geoDataRequestOptions, map[mapReference], function (data) {
										if (data.results && data.results.length > 0) {
											map[mapReference].entities.push(data.results[0].Polygons);
										}
									}, polygonStyle, function errCallback(networkStatus, statusMessage) {
										console.log(networkStatus);
										console.log(statusMessage);
									});
								}
							}
						};
						searchManager.geocode(geocodeRequest);
					});
				}
			}
		}
	}, {
		key: 'setMapOptions',
		value: function setMapOptions(mapOptions, mapReference) {
			if (map[mapReference] && mapOptions) {
				map[mapReference].setOptions(mapOptions);
			}
		}
	}, {
		key: 'setPolyline',
		value: function setPolyline(polyline, mapReference) {
			if (map[mapReference] && polyline) {

				for (var i = map[mapReference].entities.getLength() - 1; i >= 0; i--) {
					var ref = map[mapReference].entities.get(i);
					if (ref instanceof Microsoft.Maps.Polyline) {
						map[mapReference].entities.removeAt(i);
					}
				}

				var polylineLocations = polyline.location ? polyline.location : null;
				var polylineOption = polyline.option ? polyline.option : null;

				var polylineLocationsAsMapLocations = [];
				for (var polylineLocationIndex = 0; polylineLocationIndex < polylineLocations.length && polylineLocations[polylineLocationIndex][0] && polylineLocations[polylineLocationIndex][1]; polylineLocationIndex++) {
					polylineLocationsAsMapLocations.push(new Microsoft.Maps.Location(polylineLocations[polylineLocationIndex][0], polylineLocations[polylineLocationIndex][1]));
				}

				if (polylineLocationsAsMapLocations.length !== 0) {
					var polylineObject = new Microsoft.Maps.Polyline(polylineLocationsAsMapLocations, polylineOption);
					map[mapReference].entities.push(polylineObject);
				}
			}
		}
	}, {
		key: 'setDirections',
		value: function setDirections(directions, mapReference) {
			if (map[mapReference] && directions) {
				var inputPanel = directions.inputPanel ? directions.inputPanel : null;
				var renderOptions = directions.renderOptions ? directions.renderOptions : null;
				var requestOptions = directions.requestOptions ? directions.requestOptions : null;
				var wayPoints = directions.wayPoints ? directions.wayPoints : [];
				var wayPointsAsDirection = [];

				Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
					var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map[mapReference]);
					directionsManager.clearAll();
					if (inputPanel) {
						directionsManager.showInputPanel(inputPanel);
					}
					if (renderOptions) {
						if (renderOptions.itineraryContainer) {
							renderOptions.itineraryContainer = document.getElementById(renderOptions.itineraryContainer);
						}
						directionsManager.setRenderOptions(renderOptions);
					}
					if (requestOptions) {
						var distanceUnit = requestOptions.distanceUnit ? Microsoft.Maps.Directions.DistanceUnit[requestOptions.distanceUnit] : null;
						var routeMode = requestOptions.routeMode ? Microsoft.Maps.Directions.RouteMode[requestOptions.routeMode] : null;
						var routeAvoidance = requestOptions.routeAvoidance ? Microsoft.Maps.Directions.RouteAvoidance[requestOptions.routeAvoidance] : null;
						var routeOptimization = requestOptions.routeOptimization ? Microsoft.Maps.Directions.RouteOptimization[requestOptions.routeOptimization] : null;
						var timeType = requestOptions.timeType ? Microsoft.Maps.Directions.TimeTypes[requestOptions.timeType] : null;

						var vehicleSpec = requestOptions.vehicleSpec ? requestOptions.vehicleSpec : null;
						var maxRoutes = requestOptions.maxRoutes ? requestOptions.maxRoutes : null;
						var routeDraggable = requestOptions.routeDraggable ? requestOptions.routeDraggable : null;
						var routeIndex = requestOptions.routeIndex ? requestOptions.routeIndex : null;
						var time = requestOptions.time ? requestOptions.time : null;

						directionsManager.setRequestOptions(Object.assign({}, distanceUnit && { distanceUnit: distanceUnit }, maxRoutes && { maxRoutes: maxRoutes }, routeMode && { routeMode: routeMode }, routeAvoidance && { routeAvoidance: routeAvoidance }, routeOptimization && { routeOptimization: routeOptimization }, timeType && { timeType: timeType }, vehicleSpec && { vehicleSpec: vehicleSpec }, routeDraggable && { routeDraggable: routeDraggable }, routeIndex && { routeIndex: routeIndex }, time && { time: time }));
					}

					for (var wayPointsIndex = 0; wayPointsIndex < wayPoints.length; wayPointsIndex++) {
						var address = wayPoints[wayPointsIndex].address ? wayPoints[wayPointsIndex].address : null;
						var location = wayPoints[wayPointsIndex].location && wayPoints[wayPointsIndex].location[0] && wayPoints[wayPointsIndex].location[1] ? new Microsoft.Maps.Location(wayPoints[wayPointsIndex].location[0], wayPoints[wayPointsIndex].location[1]) : null;
						var isViaPoint = wayPoints[wayPointsIndex].isViaPoint ? wayPoints[wayPointsIndex].isViaPoint : null;

						wayPointsAsDirection.push(new Microsoft.Maps.Directions.Waypoint({
							address: address,
							location: location,
							isViaPoint: isViaPoint
						}));
					}
					if (wayPointsAsDirection.length !== 0) {
						for (var wayPointsAsDirectionIndex = 0; wayPointsAsDirectionIndex < wayPointsAsDirection.length; wayPointsAsDirectionIndex++) {
							directionsManager.addWaypoint(wayPointsAsDirection[wayPointsAsDirectionIndex]);
						}
						directionsManager.calculateDirections();
					}
				});
			}
		}
	}, {
		key: 'setMapHandlers',
		value: function setMapHandlers(mapHandlers, mapReference) {
			if (map[mapReference] && mapHandlers) {
				for (var mapHandlerIndex = 0; mapHandlerIndex < mapHandlers.length; mapHandlerIndex++) {
					var mapHandler = mapHandlers[mapHandlerIndex];
					if (mapHandler.addHandler) {
						Microsoft.Maps.Events.addHandler(map[mapReference], mapHandler.addHandler, function (callback, e) {
							var callbackData = {
								event: e,
								map: map[mapReference]
							};
							this.MakeCallback(callback, callbackData);
						}.bind(this, mapHandler.callback));
					} else {
						Microsoft.Maps.Events.addHandler(map[mapReference], "click", function (callback, e) {
							var callbackData = {
								event: e,
								map: map[mapReference]
							};
							this.MakeCallback(callback, callbackData);
						}.bind(this, mapHandler.callback));
					}
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { id: this.props.id, className: (0, _classnames2.default)('react-bingmaps', this.props.className) });
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
	})),
	boundary: _propTypes2.default.shape({
		location: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.number), _propTypes2.default.arrayOf(_propTypes2.default.string)]),
		option: _propTypes2.default.object,
		polygonStyle: _propTypes2.default.object,
		search: _propTypes2.default.string
	}),
	mapOptions: _propTypes2.default.object,
	polyline: _propTypes2.default.shape({
		location: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)),
		option: _propTypes2.default.object
	}),
	directions: _propTypes2.default.object,
	mapHandlers: _propTypes2.default.arrayOf(_propTypes2.default.object)
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
	regularPolygons: undefined,
	boundary: undefined,
	mapOptions: undefined,
	polyline: undefined,
	directions: undefined,
	mapHandlers: undefined
};