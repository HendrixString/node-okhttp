'use strict';

import HttpRequestProcess from './core/HttpRequestProcess'

var _method                         = Symbol();//URLRequestMethod.GET;
var _url                            = Symbol();
var _body                           = Symbol();
var _headers                        = Symbol();
var _queryParams                    = Symbol();
var _responseEncoding               = Symbol();
var _classResponse                  = Symbol();

var _dataAux                        = Symbol();

var _flagReturnRequestAsResponse    = Symbol();
var _httpRequestProcess             = Symbol();

/**
 * Request class, represents an HTTP Request.
 *
 * @author Tomer Shalev
 *
 */
export default class Request {
    //noinspection JSUnusedGlobalSymbols
    constructor() {
        this[_method]                       = 'GET';
        this[_url]                          = null;
        this[_body]                         = null;
        this[_headers]                      = {};
        this[_queryParams]                  = {};
        this[_classResponse]                = null;
        this[_dataAux]                      = null;
        this[_flagReturnRequestAsResponse]  = false;
        this[_httpRequestProcess]           = new HttpRequestProcess(this);
        this[_responseEncoding]             = 'utf8';
    }

    test(){
        console.log('hello Request');
    }

    /**
     * execute the request, using it's HTTP carrier
     *
     * @return {Promise} a promise instance for the async HTTP task.
     */
    execute() {
        return new Promise(this.httpRequestProcess.process.bind(this.httpRequestProcess));
    }

    /**
     * pass some auxiliary data with this object like <code>identifier</code> for the request
     */
    get dataAux() { return this[_dataAux]; }
    set dataAux(value) {
        this[_dataAux] = value;
    }

    /**
     *
     * @returns {HttpRequestProcess} the http carrier process
     */
    get httpRequestProcess() { return this[_httpRequestProcess]; }

    /**
     * stop the request
     */
    stop() {
        //this.httpRequestProcess.stop();
    }

    /**
     * @returns {Object} Object of key/value pairs for the request header.
     */
    get headers() { return this[_headers]; }
    /**
     * @param {Object} value Object of key/value pairs for the request header.
     */
    set headers(value) {
        this[_headers] = value;
    }

    /**
     * @returns {RequestBody} the body of the request
     */
    get body() { return this[_body]; }
    /**
     * @param {RequestBody} value the body of the request
     */
    set body(value) {
        this[_body] = value;
    }

    /**
     * @returns {string} the url of the request
     */
    get url() { return this[_url]; }
    /**
     * @param {string} value the url of the request
     */
    set url(value) {
        this[_url] = value;
    }

    /**
     * @returns {string} the http method of the request.
     */
    get method() { return this[_method]; }
    /**
     * @param {string} value the http method of the request.
     */
    set method(value) {
        this[_method] = value;
    }

    /**
     * @returns {Object} the query parameters. a key/value object
     */
    get queryParams() { return this[_queryParams]; }

    /**
     * @param {Object} value the query parameters. a key/value object
     */
    set queryParams(value) {
        this[_queryParams] = value;
    }

    /**
     * null for buffer, utf8 for string
     *
     * @returns {*}
     */
    get responseEncoding() { return this[_responseEncoding]; }
    set responseEncoding(value) {
        this[_responseEncoding] = value;
    }

    get classResponse() { return this[_classResponse]; }
    set classResponse(value) {
        this[_classResponse] = value;
    }

}
