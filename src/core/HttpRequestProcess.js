'use strict';

import {objectToQueryString} from '../utils/FormatUtils.js'
import BaseWorker            from './BaseWorker'

const url           = require('url');
const http          = require('http');
const https         = require('https');

    const TAG       = 'HttpRequestProcess:: ';

var _request        = Symbol();
var _node_request   = Symbol();

/**
 * internal driver/process for the HTTP request
 */
export default class HttpRequestProcess extends BaseWorker
{

    /**
     *
     * @param {Request} $request        instance
     * @param {String}  $id             id
     * @param {*}       $priorityKey    priority
     */
    constructor($request, $id = 0, $priorityKey = 0) {
        super($id, $priorityKey);

        this[_request]          = $request;
        this[_node_request]     = null;
    }

    /**
     * process the HTTP request
     *
     * @param {Function} onComplete completion callback(data)
     * @param {Function} onError    error handler(err)
     */
    process(onComplete, onError) {
        super.process(onComplete, onError);

        let self            = this;
        let request         = this.request;
        let body            = request.body;
        let parsedUrl       = url.parse(this.request.url);

        let path            = parsedUrl.path + objectToQueryString(request.queryParams);
        let hostname        = parsedUrl.hostname;
        let http_carrier    = parsedUrl.protocol === 'https:' ? https : http;

        let headers         = body ? Object.assign(request.headers, body.mimes) : Object.assign({}, request.headers);

        let response_data   = null;

        let options         = {
            hostname:   hostname,
            path:       path,
            method:     request.method,
            headers:    headers,
            port:       parsedUrl.port
        };

        function request_onResponse(res) {
            // from documentation
            // This properly handles multi-byte characters that would otherwise be potentially
            // mangled if you simply pulled the Buffers directly and called buf.toString(encoding) on them.
            // If you want to read the data as strings, always use this method.
            //

            if(request.responseEncoding)
                res.setEncoding(request.responseEncoding);

            res.on('data', response_onData)
               .on('end',  response_onEnd);
        }

        function request_onError(err) {
            console.error(TAG + 'problem with request: ' + err.message);

            self.notifyError(err);
        }

        function response_onData(chunk) {

            // readable streams can only be <code>Buffer</code> or <code>String(utf8 or hex)</code>
            if(Buffer.isBuffer(chunk)) {
                if(response_data === null)
                    response_data = [];

                response_data.push(chunk);
            }
            else {
                if(response_data === null)
                    response_data = '';

                response_data += chunk;
            }

            console.log(TAG + 'response_onData');
        }

        function response_onEnd() {
            // if it is an <code>Array</code>, then it is an array of buffers. Therefore merge them
            response_data = Array.isArray(response_data) ? Buffer.concat(response_data) : response_data;

            self.notifyComplete(response_data);

            console.log(TAG + 'No more data in response.')
        }

        if(headers['Transfer-Encoding'] !== 'chunked')
            if(body && body.content)
                headers['Content-Length'] = body.content.length; // this works since content can be a String or Buffer

        var req = this[_node_request] = http_carrier.request(options, request_onResponse);

        req.on('error', request_onError);

        if(body && body.content) {
            req.write(body.content);
        }

        req.end();
    }

    /**
     * @inheritDoc
     */
    stop() {
        if(this[_node_request])
            this[_node_request].abort();

        super.stop();
    }

    /**
     * @inheritDoc
     */
    dispose() {
        this.stop();

        super.dispose();

        this[_node_request] = null;
        this[_request]      = null;
    }

    /**
     *
     * @returns {Request}
     */
    get request() {
        return this[_request];
    }

}
