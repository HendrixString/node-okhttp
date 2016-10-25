'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Request = require('../Request');

var _Request2 = _interopRequireDefault(_Request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _request = Symbol();

/**
 * HTTP Request builder.
 *
 * @author Tomer Shalev
 *
 * @see Request
 */

var RequestBuilder = function () {

    /**
     *
     * @param {Request} request you can specify a <code>Request</code> reference to apply the building on. otherwise, a new instance will be made.
     */
    function RequestBuilder(request) {
        _classCallCheck(this, RequestBuilder);

        this[_request] = request ? request : new _Request2.default();
    }

    /**
     * build the request
     *
     * @return {Request} <code>Request</code> reference or new instance
     */


    _createClass(RequestBuilder, [{
        key: 'build',
        value: function build() {
            return this[_request];
        }

        /**
         * build and execute the request
         *
         * @return {Promise} a promise instance for the async HTTP task. callback returns a {response, data, request} object
         */

    }, {
        key: 'buildAndExecute',
        value: function buildAndExecute() {
            return this.build().execute();
        }

        /**
         * add a new Header to the request.
         *
         * @param {String} name the name of the header
         * @param {String} value the value of the header
         *
         * @return {RequestBuilder} <code>RequestBuilder</code> reference
         *
         */

    }, {
        key: 'header',
        value: function header(name, value) {
            this[_request].headers[name] = value;

            return this;
        }

        /**
         * apply a new query parameters object
         *
         * @param {Object} q a key/value Object
         *
         * @return {RequestBuilder} <code>RequestBuilder</code> reference
         *
         */

    }, {
        key: 'queryAll',
        value: function queryAll(q) {
            this[_request].queryParams = q;

            return this;
        }

        /**
         * add a new key/value into the query parameters
         *
         * @param {string} key the key
         * @param {string} value the value
         *
         * @return {RequestBuilder} <code>RequestBuilder</code> reference
         *
         */

    }, {
        key: 'query',
        value: function query(key, value) {
            this[_request].queryParams[key] = value;

            return this;
        }

        /**
         * the url of the request
         *
         * @param {string} value the url
         *
         * @return {RequestBuilder} <code>RequestBuilder</code> reference
         */

    }, {
        key: 'url',
        value: function url(value) {
            this[_request].url = value;

            return this;
        }

        /**
         * set response to be a buffer.
         * use case, download an image.
         *
         * @returns {RequestBuilder}
         */

    }, {
        key: 'bufferResponse',
        value: function bufferResponse() {
            this[_request].responseEncoding = null;

            return this;
        }

        /**
         * set response to be a utf8 text.
         * use case, download a json.
         *
         * @returns {RequestBuilder}
         */

    }, {
        key: 'textResponse',
        value: function textResponse() {
            this[_request].responseEncoding = 'utf8';

            return this;
        }

        /**
         * specify <code>GET</code> method
         *
         * @param {string} url the url
         *
         * @return {RequestBuilder} <code>RequestBuilder</code> reference
         */

    }, {
        key: 'GET',
        value: function GET() {
            var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            this[_request].method = 'GET';

            if (url) {
                this[_request].url = url;
            }

            return this;
        }

        /**
         * specify <code>PUT</code> method
         *
         * @param {RequestBody} body the request body
         *
         * @return {RequestBuilder} <code>RequestBuilder</code> reference
         *
         */

    }, {
        key: 'PUT',
        value: function PUT(body) {
            this[_request].method = 'PUT';
            this[_request].body = body;

            return this;
        }

        /**
         * specify <code>DELETE</code> method
         *
         * @return {RequestBuilder} <code>RequestBuilder</code> reference
         *
         */

    }, {
        key: 'DELETE',
        value: function DELETE() {
            this[_request].method = 'DELETE';

            return this;
        }

        /**
         * specify <code>HEAD</code> method
         *
         * @return {RequestBuilder} <code>RequestBuilder</code> reference
         *
         */

    }, {
        key: 'HEAD',
        value: function HEAD() {
            this[_request].method = 'HEAD';

            return this;
        }

        /**
         * specify <code>OPTIONS</code> method
         *
         * @return {RequestBuilder} <code>RequestBuilder</code> reference
         *
         */

    }, {
        key: 'OPTIONS',
        value: function OPTIONS() {
            this[_request].method = 'OPTIONS';

            return this;
        }

        /**
         * specify <code>POST</code> method
         *
         * @param {RequestBody} body the request body
         *
         * @return {RequestBuilder} <code>RequestBuilder</code> reference
         *
         */

    }, {
        key: 'POST',
        value: function POST() {
            var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            this[_request].method = 'POST';
            this[_request].body = body;

            return this;
        }
    }]);

    return RequestBuilder;
}();

exports.default = RequestBuilder;