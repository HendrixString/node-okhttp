'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _onComplete = Symbol();
var _onError = Symbol();

var _id = Symbol();
var _priorityKey = Symbol();

var _isRunning = Symbol();

/**
 * Base Worker
 */

var BaseWorker = function () {

    /**
     *
     * @param {String} $id              id
     * @param {Object} $priorityKey     a priority key
     */
    function BaseWorker($id, $priorityKey) {
        _classCallCheck(this, BaseWorker);

        this[_id] = $id;
        this[_priorityKey] = $priorityKey;
    }

    /**
     * process the worker
     *
     * @param {Function} onComplete completion callback(data)
     * @param {Function} onError    error handler(err)
     */


    _createClass(BaseWorker, [{
        key: 'process',
        value: function process(onComplete, onError) {
            this[_onComplete] = onComplete;
            this[_onError] = onError;
            this[_isRunning] = true;
        }

        /**
         * stop the worker
         */

    }, {
        key: 'stop',
        value: function stop() {
            this[_isRunning] = false;
        }

        /**
         * is the worker running ?
         *
         * @returns {Boolean} <code>true/false</code>
         */

    }, {
        key: 'notifyComplete',


        /**
         * notify completion
         *
         * @param {*} res a response
         */
        value: function notifyComplete(res) {
            var res = res ? res : this;

            if (typeof this[_onComplete] === 'function') this[_onComplete](res);

            this[_isRunning] = false;
        }

        /**
         * notify error
         *
         * @param {*} res a response
         */

    }, {
        key: 'notifyError',
        value: function notifyError() {
            var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var res = res ? res : this;

            if (typeof this[_onError] === 'function') this[_onError](res);

            this[_isRunning] = false;
        }

        /**
         * dispose the worker
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            this.stop();

            this[_onComplete] = false;
            this[_onError] = false;
            this[_isRunning] = false;
        }

        /**
         *
         * @returns {String|number} the id of the worker
         */

    }, {
        key: 'isRunning',
        get: function get() {
            return this[_isRunning];
        }
    }, {
        key: 'id',
        get: function get() {
            return this[_id];
        }

        /**
         *
         * @returns {*} the priority key of the worker
         */

    }, {
        key: 'priorityKey',
        get: function get() {
            return this[_priorityKey];
        }

        /**
         *
         * @param value the new priority key of the worker
         */
        ,
        set: function set(value) {
            this[_priorityKey] = value;
        }
    }]);

    return BaseWorker;
}();

exports.default = BaseWorker;