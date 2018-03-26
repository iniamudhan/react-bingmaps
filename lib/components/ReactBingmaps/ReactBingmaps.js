'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./ReactBingmaps.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactBingmaps = function (_Component) {
	_inherits(ReactBingmaps, _Component);

	function ReactBingmaps(props) {
		_classCallCheck(this, ReactBingmaps);

		var _this = _possibleConstructorReturn(this, (ReactBingmaps.__proto__ || Object.getPrototypeOf(ReactBingmaps)).call(this, props));

		_this.initializeReactBingmaps = _this.initializeReactBingmaps.bind(_this);
		return _this;
	}

	_createClass(ReactBingmaps, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.initializeReactBingmaps = function () {
				this.initializeReactBingmaps(this.props, window.Microsoft);
			}.bind(this);
			this.loadScript("https://www.bing.com/api/maps/mapcontrol?callback=initializeReactBingmaps");
		}
	}, {
		key: 'MakeCallback',
		value: function MakeCallback(callback) {
			callback();
		}
	}, {
		key: 'initializeReactBingmaps',
		value: function initializeReactBingmaps(props, Microsoft) {
			var _this2 = this;

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
			    infoboxesWithPushPins = props.infoboxesWithPushPins;

			var isBirdEyeAvailable = false;
			if (mapTypeId === "birdseye" && center && center[0] && center[1]) {
				var location = new Microsoft.Maps.Location(center[0], center[1]);
				Microsoft.Maps.getIsBirdseyeAvailable(location, Microsoft.Maps.Heading[heading], function (onResponse) {
					isBirdEyeAvailable = onResponse;
				});
			}
			if (bingmapKey) {
				if (!Microsoft) {
					Microsoft = window.Microsoft;
				}
				var map = new Microsoft.Maps.Map('.react-bingmaps', _extends({
					credentials: bingmapKey
				}, center && center[0] && center[1] ? { center: new Microsoft.Maps.Location(center[0], center[1]) } : {}, mapTypeId ? { mapTypeId: isBirdEyeAvailable ? Microsoft.Maps.MapTypeId.birdseye : Microsoft.Maps.MapTypeId[mapTypeId] } : {}, zoom ? { zoom: zoom } : {}, navigationBarMode ? { navigationBarMode: Microsoft.Maps.NavigationBarMode[navigationBarMode] } : {}, supportedMapTypes ? { supportedMapTypes: supportedMapTypes.map(function (id) {
						return Microsoft.Maps.MapTypeId[id];
					}) } : {}, disableStreetside ? { disableStreetside: disableStreetside } : { disableStreetside: disableStreetside }));
				if (pushPins) {
					for (var pushPinIndex = 0; pushPinIndex < pushPins.length; pushPinIndex++) {
						if (pushPins[pushPinIndex].location && pushPins[pushPinIndex].location[0] && pushPins[pushPinIndex].location[1]) {
							var _location = new Microsoft.Maps.Location(pushPins[pushPinIndex].location[0], pushPins[pushPinIndex].location[1]);
							var option = pushPins[pushPinIndex] ? pushPins[pushPinIndex].option : null;
							if (option.anchor && option.anchor[0] && option.anchor[1]) {
								option.anchor = new Microsoft.Maps.Point(option.anchor[0], option.anchor[1]);
							}
							var pushpin = new Microsoft.Maps.Pushpin(_location, option);
							map.entities.push(pushpin);
							if (pushPins[pushPinIndex].addHandler) {
								Microsoft.Maps.Events.addHandler(pushpin, pushPins[pushPinIndex].addHandler.type, function (callback) {
									this.MakeCallback(callback);
								}.bind(this, pushPins[pushPinIndex].addHandler.callback));
							}
						}
					}
				}
				if (infoboxes) {
					for (var infoboxIndex = 0; infoboxIndex < infoboxes.length; infoboxIndex++) {
						if (infoboxes[infoboxIndex].location && infoboxes[infoboxIndex].location[0] && infoboxes[infoboxIndex].location[1]) {
							var _location2 = new Microsoft.Maps.Location(infoboxes[infoboxIndex].location[0], infoboxes[infoboxIndex].location[1]);
							var _option = infoboxes[infoboxIndex] ? infoboxes[infoboxIndex].option : null;
							var infobox = new Microsoft.Maps.Infobox(_location2, _option);
							infobox.setMap(map);
							if (infoboxes[infoboxIndex].addHandler) {
								Microsoft.Maps.Events.addHandler(infobox, infoboxes[infoboxIndex].addHandler.type, function (callback) {
									this.MakeCallback(callback);
								}.bind(this, infoboxes[infoboxIndex].addHandler.callback));
							}
						}
					}
				}
				if (infoboxesWithPushPins) {
					for (var infoboxWithPushPinIndex = 0; infoboxWithPushPinIndex < infoboxesWithPushPins.length; infoboxWithPushPinIndex++) {
						if (infoboxesWithPushPins[infoboxWithPushPinIndex].location) {
							(function () {
								var location = new Microsoft.Maps.Location(infoboxesWithPushPins[infoboxWithPushPinIndex].location[0], infoboxesWithPushPins[infoboxWithPushPinIndex].location[1]);
								var infoboxOption = infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxOption ? infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxOption : null;
								if (infoboxesWithPushPins[infoboxWithPushPinIndex].addHandler) {
									infoboxOption["visible"] = false;
								}
								var pushPinOption = infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinOption ? infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinOption : null;
								if (pushPinOption.anchor && pushPinOption.anchor[0] && pushPinOption.anchor[1]) {
									pushPinOption.anchor = new Microsoft.Maps.Point(pushPinOption.anchor[0], pushPinOption.anchor[1]);
								}
								var infobox = new Microsoft.Maps.Infobox(location, infoboxOption);
								infobox.setMap(map);
								if (infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler) {
									Microsoft.Maps.Events.addHandler(infobox, infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler.type, function (callback) {
										this.MakeCallback(callback);
									}.bind(_this2, infoboxesWithPushPins[infoboxWithPushPinIndex].infoboxAddHandler.callback));
								}
								var pushpin = new Microsoft.Maps.Pushpin(location, pushPinOption);
								map.entities.push(pushpin);
								if (infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinAddHandler) {
									Microsoft.Maps.Events.addHandler(infobox, infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinAddHandler.type, function (callback) {
										this.MakeCallback(callback);
									}.bind(_this2, infoboxesWithPushPins[infoboxWithPushPinIndex].pushPinAddHandler.callback));
								}
								if (infoboxesWithPushPins[infoboxWithPushPinIndex].addHandler) {
									if (infoboxesWithPushPins[infoboxWithPushPinIndex].addHandler === "mouseover") {
										Microsoft.Maps.Events.addHandler(pushpin, infoboxesWithPushPins[infoboxWithPushPinIndex].addHandler, function () {
											infobox.setOptions({ visible: true });
										});
										Microsoft.Maps.Events.addHandler(pushpin, "mouseout", function () {
											infobox.setOptions({ visible: false });
										});
									}
								}
							})();
						}
					}
				}
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
			this.initializeReactBingmaps(nextProps, window.Microsoft);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
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
	zoom: undefined
};