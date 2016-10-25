'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpRequestProcess = require('./core/HttpRequestProcess');

var _HttpRequestProcess2 = _interopRequireDefault(_HttpRequestProcess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _method = Symbol(); //URLRequestMethod.GET;
var _url = Symbol();
var _body = Symbol();
var _headers = Symbol();
var _queryParams = Symbol();
var _responseEncoding = Symbol();
var _classResponse = Symbol();

var _dataAux = Symbol();

var _flagReturnRequestAsResponse = Symbol();
var _httpRequestProcess = Symbol();

/**
 * Request class, represents an HTTP Request.
 *
 * @author Tomer Shalev
 *
 */

var Request = function () {
  //noinspection JSUnusedGlobalSymbols
  function Request() {
    _classCallCheck(this, Request);

    this[_method] = 'GET';
    this[_url] = null;
    this[_body] = null;
    this[_headers] = {};
    this[_queryParams] = {};
    this[_classResponse] = null;
    this[_dataAux] = null;
    this[_flagReturnRequestAsResponse] = false;
    this[_httpRequestProcess] = new _HttpRequestProcess2.default(this);
    this[_responseEncoding] = 'utf8';
  }

  _createClass(Request, [{
    key: 'test',
    value: function test() {
      console.log('hello Request');
    }

    /**
     * execute the request, using it's HTTP carrier
     *
     * @return {Promise} a promise instance for the async HTTP task.
     */

  }, {
    key: 'execute',
    value: function execute() {
      return new Promise(this.httpRequestProcess.process.bind(this.httpRequestProcess));
    }

    /**
     * pass some auxiliary data with this object like <code>identifier</code> for the request
     */

  }, {
    key: 'stop',


    /**
     * stop the request
     */
    value: function stop() {}
    //this.httpRequestProcess.stop();


    /**
     * @returns {Object} Object of key/value pairs for the request header.
     */

  }, {
    key: 'dataAux',
    get: function get() {
      return this[_dataAux];
    },
    set: function set(value) {
      this[_dataAux] = value;
    }

    /**
     *
     * @returns {HttpRequestProcess} the http carrier process
     */

  }, {
    key: 'httpRequestProcess',
    get: function get() {
      return this[_httpRequestProcess];
    }
  }, {
    key: 'headers',
    get: function get() {
      return this[_headers];
    }
    /**
     * @param {Object} value Object of key/value pairs for the request header.
     */
    ,
    set: function set(value) {
      this[_headers] = value;
    }

    /**
     * @returns {RequestBody} the body of the request
     */

  }, {
    key: 'body',
    get: function get() {
      return this[_body];
    }
    /**
     * @param {RequestBody} value the body of the request
     */
    ,
    set: function set(value) {
      this[_body] = value;
    }

    /**
     * @returns {string} the url of the request
     */

  }, {
    key: 'url',
    get: function get() {
      return this[_url];
    }
    /**
     * @param {string} value the url of the request
     */
    ,
    set: function set(value) {
      this[_url] = value;
    }

    /**
     * @returns {string} the http method of the request.
     */

  }, {
    key: 'method',
    get: function get() {
      return this[_method];
    }
    /**
     * @param {string} value the http method of the request.
     */
    ,
    set: function set(value) {
      this[_method] = value;
    }

    /**
     * @returns {Object} the query parameters. a key/value object
     */

  }, {
    key: 'queryParams',
    get: function get() {
      return this[_queryParams];
    }

    /**
     * @param {Object} value the query parameters. a key/value object
     */
    ,
    set: function set(value) {
      this[_queryParams] = value;
    }

    /**
     * null for buffer, utf8 for string
     *
     * @returns {*}
     */

  }, {
    key: 'responseEncoding',
    get: function get() {
      return this[_responseEncoding];
    },
    set: function set(value) {
      this[_responseEncoding] = value;
    }
  }, {
    key: 'classResponse',
    get: function get() {
      return this[_classResponse];
    },
    set: function set(value) {
      this[_classResponse] = value;
    }
  }]);

  return Request;
}();

exports.default = Request;