'use strict';

const LF                    = '\r\n';

var _mimes   = Symbol();//URLRequestMethod.GET;
var _content = Symbol();

/**
 * a Request Body class. can a body or a part body.
 *
 * @author Tomer Shalev
 */
//noinspection JSUnusedGlobalSymbols
export default class RequestBody {
    //noinspection JSUnusedGlobalSymbols

    constructor() {
        this[_mimes] = {};
        this[_content] = null;
    }

    test(){
        console.log('hello RequestBody');
    }

    /**
     * create a body with a content/mime type
     *
     * @param {Buffer|String|Object} content <code>Buffer, String or Object</code> (or anything that has <code>.toString()</code>)
     * @param {Object} mimes key/value object of <code>MIME</code> headers, use MimeBuilder
     *
     * @return a new request body
     *
     * @see MimeBuilder
     *
     */
    static create(content, mimes) {
        let rb = new RequestBody();

        if(Buffer.isBuffer(content)) {
            rb.content = content;
        }
        else if(typeof content === 'string') {
            rb.content = content;//new Buffer(content, 'utf8');
        }
        else {
            rb.content = JSON.stringify(content);
        }

        rb.mimes = mimes;

        return rb;
    }

    /**
     *
     * @returns {string} convert the key/value object into string with LF per line.
     */
    mimesToString() {
        let res = '';

        for(let mimeName in this.mimes) {
            if(this.mimes.hasOwnProperty(mimeName))
                res += mimeName + ': ' + this.mimes[mimeName] + LF;
        }

        return res;
    }

    /**
     *  mimes key/value object of <code>MIME</code> headers
     */
    get mimes() { return this[_mimes]; }
    set mimes(value) {
        this[_mimes] = value;
    }

    /**
     * the body, can be a Buffer or a String(utf-8)
     */
    get content() { return this[_content]; }
    set content(value) {
        this[_content] = value;
    }

}
