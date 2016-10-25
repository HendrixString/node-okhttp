'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _FormatUtils = require('../utils/FormatUtils.js');

var _BaseWorker2 = require('./BaseWorker');

var _BaseWorker3 = _interopRequireDefault(_BaseWorker2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TAG = 'HttpRequestProcess:: ';

var _request = Symbol();
var _node_request = Symbol();
var _response = Symbol();
var _data = Symbol();

var Response = function Response() {
    _classCallCheck(this, Response);
};

/**
 * internal driver/process for the HTTP request
 */


var HttpRequestProcess = function (_BaseWorker) {
    _inherits(HttpRequestProcess, _BaseWorker);

    /**
     *
     * @param {Request} $request        instance
     * @param {String}  $id             id
     * @param {*}       $priorityKey    priority
     */
    function HttpRequestProcess($request) {
        var $id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
        var $priorityKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, HttpRequestProcess);

        var _this = _possibleConstructorReturn(this, (HttpRequestProcess.__proto__ || Object.getPrototypeOf(HttpRequestProcess)).call(this, $id, $priorityKey));

        _this[_request] = $request;
        _this[_node_request] = null;
        _this[_response] = null;
        _this[_data] = null;
        return _this;
    }

    /**
     * process the HTTP request
     *
     * @param {Function} onComplete completion callback(data, response)
     * @param {Function} onError    error handler(err)
     */


    _createClass(HttpRequestProcess, [{
        key: 'process',
        value: function process(onComplete, onError) {
            _get(HttpRequestProcess.prototype.__proto__ || Object.getPrototypeOf(HttpRequestProcess.prototype), 'process', this).call(this, onComplete, onError);

            this[_data] = null;
            this[_response] = null;

            var self = this;
            var request = this.request;
            var body = request.body;
            var parsedUrl = _url2.default.parse(this.request.url);

            var path = parsedUrl.path + (0, _FormatUtils.objectToQueryString)(request.queryParams);
            var hostname = parsedUrl.hostname;
            var http_carrier = parsedUrl.protocol === 'https:' ? _https2.default : _http2.default;

            var headers = body ? _extends(request.headers, body.mimes) : _extends({}, request.headers);

            // data read from the response body
            var response_data = null;
            // the response, only referenced when 'response' event fired.
            var response = null;

            var options = {
                hostname: hostname,
                path: path,
                method: request.method,
                headers: headers,
                port: parsedUrl.port
            };

            function request_onResponse(res) {
                // from documentation
                // This properly handles multi-byte characters that would otherwise be potentially
                // mangled if you simply pulled the Buffers directly and called buf.toString(encoding) on them.
                // If you want to read the data as strings, always use this method.
                //

                self[_response] = res;

                if (request.responseEncoding) res.setEncoding(request.responseEncoding);

                res.on('data', response_onData).on('end', response_onEnd);
            }

            function request_onError(err) {
                console.error(TAG + 'problem with request: ' + err.message);

                self.notifyError(err);
            }

            function response_onData(chunk) {

                // readable streams can only be <code>Buffer</code> or <code>String(utf8 or hex)</code>
                if (Buffer.isBuffer(chunk)) {
                    if (response_data === null) response_data = [];

                    response_data.push(chunk);
                } else {
                    if (response_data === null) response_data = '';

                    response_data += chunk;
                }

                //console.log(TAG + 'response_onData');
            }

            function response_onEnd() {
                // if it is an <code>Array</code>, then it is an array of buffers. Therefore merge them
                response_data = Array.isArray(response_data) ? Buffer.concat(response_data) : response_data;
                self[_data] = response_data;

                self.notifyComplete(self);

                console.log(TAG + 'No more data in response.');
            }

            if (headers['Transfer-Encoding'] !== 'chunked') if (body && body.content) headers['Content-Length'] = body.content.length; // this works since content can be a String or Buffer

            var req = this[_node_request] = http_carrier.request(options, request_onResponse);

            req.on('error', request_onError);

            if (body && body.content) {
                req.write(body.content);
            }

            req.end();
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'stop',
        value: function stop() {
            if (this[_node_request]) this[_node_request].abort();

            _get(HttpRequestProcess.prototype.__proto__ || Object.getPrototypeOf(HttpRequestProcess.prototype), 'stop', this).call(this);
        }

        /**
         * @inheritDoc
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            this.stop();

            _get(HttpRequestProcess.prototype.__proto__ || Object.getPrototypeOf(HttpRequestProcess.prototype), 'dispose', this).call(this);

            this[_node_request] = null;
            this[_request] = null;
        }

        /**
         *
         * @returns {Request}
         */

    }, {
        key: 'request',
        get: function get() {
            return this[_request];
        }

        /**
         *
         * @return {Buffer|String} return the response body
         */

    }, {
        key: 'data',
        get: function get() {
            return this[_data];
        }

        /**
         *
         * @return {http.IncomingMessage} return the response, where you can read statusCode and headers.
         */

    }, {
        key: 'response',
        get: function get() {
            return this[_response];
        }
    }]);

    return HttpRequestProcess;
}(_BaseWorker3.default);

exports.default = HttpRequestProcess;