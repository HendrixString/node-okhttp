'use strict';

import RequestBody from '../RequestBody';
import MimeBuilder from './MimeBuilder';

const MULTIPART_MARK        = '--';
const LF                    = '\r\n';

var _boundary               = Symbol();
var _content                = Symbol();
var _type                   = Symbol();

/**
 * a simple multi part builder. use it for <code>multipart</code> content types,
 * where the request body is composed of parts (bodies of their own)
 *
 * @author Tomer Shalev
 */
export default class MultiPartBuilder {

    /**
     * @param {String} boundary the boundary of the parts
     */
    constructor(boundary = '----------196f00b77b968397849367c61a2080') {
        this[_content]  = null;
        this[_type]     = MultiPartBuilder.FORMDATA;
        this[_boundary] = boundary;
    }

    /**
     * add a part to the request
     *
     * @param {RequestBody} body the body of the part
     *
     * @return {MultiPartBuilder} <code>MultiPartBuilder</code> reference
     *
     * @see MimeBuilder
     */
    addPart(body)
    {
        var mimes_str       = body.mimesToString();

        var body_1          = new Buffer(MULTIPART_MARK + this[_boundary] + LF + mimes_str + LF, 'utf8');
        var body_2          = new Buffer(body.content);
        var body_3          = new Buffer(LF, 'utf8');

        var buff_result     = Buffer.concat([body_1, body_2, body_3]);

        if(this[_content])
            this[_content]  = Buffer.concat([this[_content], buff_result]);
        else
            this[_content]  = buff_result;

        return this;
    }

    /**
     * multipart type of the whole request
     *
     * @param {String} $type some well accepted values are:
     *
     * <pre>
     * <li>MultiPartBuilder.FORMDATA
     * <li>MultiPartBuilder.MIXED
     * <li>MultiPartBuilder.RELATED
     * <li>MultiPartBuilder.ALTERNATIVE
     * <li>MultiPartBuilder.DIGEST
     * <li>MultiPartBuilder.PARALLEL
     *
     * @return {MultiPartBuilder} <code>MultiPartBuilder</code> reference
     *
     */
    type($type)
    {
        this[_type] = $type;

        return this;
    }

    /**
     * build the request body
     *
     * @return {RequestBody} <code>RequestBody</code> instance
     */
    build() {
        if(this[_content])
            this[_content] = Buffer.concat([this[_content], new Buffer(MULTIPART_MARK + this[_boundary] + MULTIPART_MARK + LF, 'utf8')]);

        //var res:String = _content.toString();

        return RequestBody.create(this[_content], new MimeBuilder().contentType(this[_type] + ";boundary=" + this[_boundary]).build());
    }

    /**
     * The "mixed" subtype of "multipart" is intended for use when the body
     * parts are independent and need to be bundled in a particular order. Any
     * "multipart" subtypes that an implementation does not recognize must be
     * treated as being of subtype "mixed".
     */
    static get MIXED() {return 'multipart/mixed'}

    /**
     * The "multipart/alternative" type is syntactically identical to
     * "multipart/mixed", but the semantics are different. In particular, each
     * of the body parts is an "alternative" version of the same information.
     */
    static get ALTERNATIVE() {return 'multipart/alternative'}

    /**
     * This type is syntactically identical to "multipart/mixed", but the
     * semantics are different. In particular, in a digest, the default {@code
     * Content-Type} value for a body part is changed from "text/plain" to
     * "message/rfc822".
     */
    static get DIGEST() {return 'multipart/digest'}

    /**
     * This type is syntactically identical to "multipart/mixed", but the
     * semantics are different. In particular, in a parallel entity, the order
     * of body parts is not significant.
     */
    static get PARALLEL() {return 'multipart/parallel'}

    /**
     * The media-type multipart/form-data follows the rules of all multipart
     * MIME data streams as outlined in RFC 2046. In forms, there are a series
     * of fields to be supplied by the user who fills out the form. Each field
     * has a name. Within a given form, the names are unique.
     */
    static get FORMDATA() {return 'multipart/form-data'}

    /**
     * A multipart/related is used to indicate that each message part is a component of an aggregate whole.
     * It is for compound objects consisting of several inter-related components - proper display cannot be achieved
     * by individually displaying the constituent parts. The message consists of a root part (by default, the first)
     * which reference other parts inline, which may in turn reference other parts. Message parts are commonly referenced
     * by the "Content-ID" part header. The syntax of a reference is unspecified and is instead dictated by the encoding
     * or protocol used in the part. One common usage of this subtype is to send a web page complete with images in a single message.
     * The root part would contain the HTML document, and use image tags to reference images stored in the latter parts. Defined in RFC 2387
     */
    static get RELATED() {return 'multipart/related'}
}
