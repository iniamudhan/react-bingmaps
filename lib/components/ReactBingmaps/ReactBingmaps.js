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
				this.initializeReactBingmaps();
			}.bind(this);
			this.loadScript("https://www.bing.com/api/maps/mapcontrol?callback=initializeReactBingmaps");
		}
	}, {
		key: 'initializeReactBingmaps',
		value: function initializeReactBingmaps() {
			var Microsoft = window.Microsoft;
			var _props = this.props,
			    bingmapKey = _props.bingmapKey,
			    center = _props.center,
			    mapTypeId = _props.mapTypeId,
			    zoom = _props.zoom,
			    navigationBarMode = _props.navigationBarMode,
			    supportedMapTypes = _props.supportedMapTypes,
			    heading = _props.heading;


			var isBirdEyeAvailable = false;
			if (mapTypeId === "birdseye" && center && center[0] && center[1]) {
				var location = new Microsoft.Maps.Location(center[0], center[1]);
				Microsoft.Maps.getIsBirdseyeAvailable(location, Microsoft.Maps.Heading[heading], function (onResponse) {
					isBirdEyeAvailable = onResponse;
				});
			}

			if (bingmapKey) {
				var map = new Microsoft.Maps.Map('.react-bingmaps', _extends({
					credentials: bingmapKey
				}, center && center[0] && center[1] ? { center: new Microsoft.Maps.Location(center[0], center[1]) } : {}, mapTypeId ? { mapTypeId: isBirdEyeAvailable ? Microsoft.Maps.MapTypeId.birdseye : Microsoft.Maps.MapTypeId[mapTypeId] } : {}, zoom ? { zoom: zoom } : {}, navigationBarMode ? { navigationBarMode: Microsoft.Maps.NavigationBarMode[navigationBarMode] } : {}, supportedMapTypes ? { supportedMapTypes: supportedMapTypes.map(function (id) {
						return Microsoft.Maps.MapTypeId[id];
					}) } : {}));
				console.log(map);
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
		value: function componentWillReceiveProps(nextProps) {}
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
	heading: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
ReactBingmaps.defaultProps = {
	bingmapKey: undefined,
	center: undefined,
	mapTypeId: undefined,
	navigationBarMode: undefined,
	supportedMapTypes: undefined,
	heading: 0
};