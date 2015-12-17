'use strict';

import RequestBody from '../RequestBody';
import MimeBuilder from './MimeBuilder';

const _query = Symbol();

/**
 * a simple form encoding builder. use it for <code>application/x-www-form-urlencoded</code> content type,
 * where the request body is a query string.
 *
 * @author Tomer Shalev
 */
export default class FormEncodingBuilder {

    constructor() {
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
    add(name, value)
    {
        if(this[_query].length > 0)
            this[_query] += "&";

        this[_query] += name + "=" + value;

        return this;
    }

    /**
     * build the request body
     *
     * @return {RequestBody} request <code>RequestBody</code> instance
     */
    build() {
        return RequestBody.create(this[_query], new MimeBuilder().contentType("application/x-www-form-urlencoded").build());
    }

}

