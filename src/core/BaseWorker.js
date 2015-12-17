'use strict';

var _onComplete     = Symbol();
var _onError        = Symbol();

var _id             = Symbol();
var _priorityKey    = Symbol();

var _isRunning      = Symbol();

/**
 * Base Worker
 */
export default class BaseWorker {

    /**
     *
     * @param {String} $id              id
     * @param {Object} $priorityKey     a priority key
     */
    constructor($id, $priorityKey) {
        this[_id]           = $id;
        this[_priorityKey]  = $priorityKey;
    }

    /**
     * process the worker
     *
     * @param {Function} onComplete completion callback(data)
     * @param {Function} onError    error handler(err)
     */
    process(onComplete, onError) {
        this[_onComplete]   = onComplete;
        this[_onError]      = onError;
        this[_isRunning]    = true;
    }

    /**
     * stop the worker
     */
    stop() {
        this[_isRunning]    = false;
    }

    /**
     * is the worker running ?
     *
     * @returns {Boolean} <code>true/false</code>
     */
    get isRunning() {
        return this[_isRunning];
    }

    /**
     * notify completion
     *
     * @param {*} res a response
     */
    notifyComplete(res) {
        var res = res ? res : this;

        if(typeof this[_onComplete] === 'function')
            this[_onComplete](res);

        this[_isRunning] = false;
    }

    /**
     * notify error
     *
     * @param {*} res a response
     */
    notifyError(res = null) {
        var res = res ? res : this;

        if(typeof this[_onError] === 'function')
            this[_onError](res);

        this[_isRunning] = false;
    }

    /**
     * dispose the worker
     */
    dispose() {
        this.stop();

        this[_onComplete] = false;
        this[_onError] = false;
        this[_isRunning] = false;
    }

    /**
     *
     * @returns {String|number} the id of the worker
     */
    get id() {
        return this[_id];
    }

    /**
     *
     * @returns {*} the priority key of the worker
     */
    get priorityKey() {
        return this[_priorityKey];
    }

    /**
     *
     * @param value the new priority key of the worker
     */
    set priorityKey(value) {
        this[_priorityKey] = value;
    }

}
