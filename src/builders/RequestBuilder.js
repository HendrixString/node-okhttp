'use strict';

import Request from '../Request';

const _request = Symbol();

/**
 * HTTP Request builder.
 *
 * @author Tomer Shalev
 *
 * @see Request
 */
export default class RequestBuilder {

    /**
     *
     * @param {Request} request you can specify a <code>Request</code> reference to apply the building on. otherwise, a new instance will be made.
     */
    constructor(request) {
        this[_request] = request ? request : new Request();
    }

    /**
     * build the request
     *
     * @return {Request} <code>Request</code> reference or new instance
     */
    build() {
        return this[_request];
    }

    /**
     * build and execute the request
     *
     * @return {Promise} a promise instance for the async HTTP task. callback returns a {response, data, request} object
     */
    buildAndExecute() {
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
    header(name, value) {
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
    queryAll(q) {
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
    query(key, value) {
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
    url(value) {
        this[_request].url = value;

        return this;
    }

    /**
     * set response to be a buffer.
     * use case, download an image.
     *
     * @returns {RequestBuilder}
     */
    bufferResponse() {
        this[_request].responseEncoding = null;

        return this;
    }

    /**
     * set response to be a utf8 text.
     * use case, download a json.
     *
     * @returns {RequestBuilder}
     */
    textResponse() {
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
    GET(url = null) {
        this[_request].method = 'GET';

        if(url) {
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
    PUT(body)
    {
        this[_request].method = 'PUT';
        this[_request].body   = body;

        return this;
    }

    /**
     * specify <code>DELETE</code> method
     *
     * @return {RequestBuilder} <code>RequestBuilder</code> reference
     *
     */
    DELETE()
    {
        this[_request].method = 'DELETE';

        return this;
    }

    /**
     * specify <code>HEAD</code> method
     *
     * @return {RequestBuilder} <code>RequestBuilder</code> reference
     *
     */
    HEAD()
    {
        this[_request].method = 'HEAD';

        return this;
    }

    /**
     * specify <code>OPTIONS</code> method
     *
     * @return {RequestBuilder} <code>RequestBuilder</code> reference
     *
     */
    OPTIONS()
    {
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
    POST(body = null)
    {
        this[_request].method = 'POST';
        this[_request].body   = body;

        return this;
    }

}

