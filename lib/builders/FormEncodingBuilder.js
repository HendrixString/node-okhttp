'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RequestBody = require('../RequestBody');

var _RequestBody2 = _interopRequireDefault(_RequestBody);

var _MimeBuilder = require('./MimeBuilder');

var _MimeBuilder2 = _interopRequireDefault(_MimeBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _query = Symbol();

/**
 * a simple form encoding builder. use it for <code>application/x-www-form-urlencoded</code> content type,
 * where the request body is a query string.
 *
 * @author Tomer Shalev
 */

var FormEncodingBuilder = function () {
    function FormEncodingBuilder() {
        _classCallCheck(this, FormEncodingBuilder);

        this[_query] = '';
    }

    /**
     * add a query part in the body of the request
     *
     * @param name name of part
     * @param value value of part
     *
     * @return {FormEncodingBuilder} a form encoding builder
     */


    _createClass(FormEncodingBuilder, [{
        key: 'add',
        value: function add(name, value) {
            if (this[_query].length > 0) this[_query] += "&";

            this[_query] += name + "=" + value;

            return this;
        }

        /**
         * build the request body
         *
         * @return {RequestBody} request <code>RequestBody</code> instance
         */

    }, {
        key: 'build',
        value: function build() {
            return _RequestBody2.default.create(this[_query], new _MimeBuilder2.default().contentType("application/x-www-form-urlencoded").build());
        }
    }]);

    return FormEncodingBuilder;
}();

exports.default = FormEncodingBuilder;