'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FormatUtils = require('./utils/FormatUtils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LF = '\r\n';

var _mimes = Symbol();
var _content = Symbol();

/**
 * a Request Body class. can a body or a part body.
 *
 * @author Tomer Shalev
 */
//noinspection JSUnusedGlobalSymbols

var RequestBody = function () {
    //noinspection JSUnusedGlobalSymbols

    function RequestBody() {
        _classCallCheck(this, RequestBody);

        this[_mimes] = {};
        this[_content] = null;
    }

    _createClass(RequestBody, [{
        key: 'test',
        value: function test() {
            console.log('hello RequestBody');
        }

        /**
         * create a body with a content/mime type
         *
         * @param {Buffer|String|Object} content <code>Buffer, String or Object</code> (or anything that has <code>.toString()</code>)
         * @param {Object|Array} mimes key/value object of <code>MIME</code> headers, use {@link MimeBuilder}. or rest parameters string array
         *                             of mime headers
         *
         * @return {RequestBody} a new request body
         *
         * @see MimeBuilder
         *
         */

    }, {
        key: 'mimesToString',


        /**
         *
         * @returns {string} convert the key/value object into string with LF per line.
         */
        value: function mimesToString() {
            var res = '';

            for (var mimeName in this.mimes) {
                if (this.mimes.hasOwnProperty(mimeName)) res += mimeName + ': ' + this.mimes[mimeName] + LF;
            }

            return res;
        }

        /**
         *  mimes key/value object of <code>MIME</code> headers
         */

    }, {
        key: 'mimes',
        get: function get() {
            return this[_mimes];
        },
        set: function set(value) {
            this[_mimes] = value;
        }

        /**
         * the body, can be a Buffer or a String(utf-8)
         */

    }, {
        key: 'content',
        get: function get() {
            return this[_content];
        },
        set: function set(value) {
            this[_content] = value;
        }
    }], [{
        key: 'create',
        value: function create(content) {
            var rb = new RequestBody();

            if (Buffer.isBuffer(content)) {
                rb.content = content;
            } else if (typeof content === 'string') {
                rb.content = content; //new Buffer(content, 'utf8');
            } else {
                rb.content = JSON.stringify(content);
            }

            rb.mimes = {};

            for (var _len = arguments.length, mimes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                mimes[_key - 1] = arguments[_key];
            }

            if (mimes && mimes.length) {
                if (typeof mimes[0] === 'string') rb.mimes = (0, _FormatUtils.mimeStringArrayToObject)(mimes);else rb.mimes = mimes[0];
            }

            //console.log(rb.mimes);

            return rb;
        }
    }]);

    return RequestBody;
}();

exports.default = RequestBody;