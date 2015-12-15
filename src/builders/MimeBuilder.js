'use strict';

const _mime = Symbol();

/**
 * <code>MIME Builder</code> pattern for faster constructions of <code>MIME</code> Header
 *
 * @author Tomer Shalev
 */
export default class MimeBuilder {

    constructor() {
        this[_mime] = {};
    }

    /**
     * <b>Content-Type</b> Header.<br>
     * The Content-Type header declares the original file format of the part body<br>
     * RFC 2045 defines the Content-Type header in section 5 (p. 10). RFC 2046 discusses specific Content-Type values.
     *
     * @param {String} value the Mime main type
     * @param {Array} extra rest serial parameters of key/value parameters. i.e (,'charset', 'utf-8')
     *
     * @return {MimeBuilder} a <code>MimeBuilder</code> reference
     */
    contentType(value, ...extra){
        this.addMimeHeader('Content-Type', value, extra);

        return this;
    }

    /**
     * Content-ID Header.<br>
     * The Content-ID header associates a unique ID with a MIME part,<br>
     * RFC 2045 defines the Content-ID header in section 7 (p. 26).
     *
     * @param {String} value the Mime main type
     * @param {Array} extra rest serial parameters of key/value parameters. i.e (,'charset', 'utf-8')
     *
     * @return {MimeBuilder} a <code>MimeBuilder</code> reference
     */
    version(value, ...extra){
        this.addMimeHeader('MIME-Version', value, extra);

        return this;
    }

    /**
     * Content-ID Header.<br>
     * The Content-ID header associates a unique ID with a MIME part,<br>
     * RFC 2045 defines the Content-ID header in section 7 (p. 26).
     *
     * @param {String} value the Mime main type
     * @param {Array} extra rest serial parameters of key/value parameters. i.e (,'charset', 'utf-8')
     *
     * @return {MimeBuilder} a <code>MimeBuilder</code> reference
     */
    contentID(value, ...extra){
        this.addMimeHeader('Content-ID', value, extra);

        return this;
    }

    /**
     * Content-Location Header.<br>
     * The Content-Location header associates a URI with the part,<br>
     * RFC 2557 defines the Content-Location header in section 4.2 (p. 7).
     *
     * @param {String} value the Mime main type
     * @param {Array} extra rest serial parameters of key/value parameters. i.e (,'charset', 'utf-8')
     *
     * @return {MimeBuilder} a <code>MimeBuilder</code> reference
     */
    contentLocation(value, ...extra){
        this.addMimeHeader('Content-Location', value, extra);

        return this;
    }

    /**
     * Content-Description Header.<br>
     * The Content-Description header briefly describes the body the part contains,<br>
     * RFC 2045 defines the Content-Description header in section 8 (p. 27).
     *
     * @param {String} value the Mime main type
     * @param {Array} extra rest serial parameters of key/value parameters. i.e (,'charset', 'utf-8')
     *
     * @return {MimeBuilder} a <code>MimeBuilder</code> reference
     */
    contentDescription(value, ...extra){
        this.addMimeHeader('Content-Description', value, extra);

        return this;
    }

    /**
     * Content-Disposition Header, see [RFC2183] for more values and parameters.<br>
     * The content-disposition header field was added in RFC 2183 to specify the presentation style
     *
     * @param {String} value the Mime main type
     * @param {Array} extra rest serial parameters of key/value parameters. i.e (,'charset', 'utf-8')
     *
     * @return {MimeBuilder} a <code>MimeBuilder</code> reference
     */
    contentDisposition(value, ...extra){
        this.addMimeHeader('Content-Disposition', value, extra);

        return this;
    }

    /**
     * <b>Content-Transfer-Encoding</b> Header.
     * Each MIME part may contain a header that specifies whether the part was processed for transfer
     * and how the body of the message part is currently represented. The field name of this header is Content-Transfer-Encoding.
     * RFC 2045 defines the Content-Transfer-Encoding header in section 6 (p. 14).
     *
     * @param {String} value the Mime main type
     * @param {Array} extra rest serial parameters of key/value parameters. i.e (,'charset', 'utf-8')
     *
     * @return {MimeBuilder} a <code>MimeBuilder</code> reference
     */
    contentTransferEncoding(value, ...extra){
        this.addMimeHeader('Content-Transfer-Encoding', value, extra);

        return this;
    }

    /**
     *
     * @param name
     * @param value
     * @param {Array} extra
     */
    addMimeHeader(name, value, extra) {
        let res = value;

        let cParams = extra.length;

        if (cParams % 2 == 0) {
            for (let ix = 0; ix <= extra.length - 2; ix += 2){
                res += `; ${extra[ix + 0]}=${extra[ix + 1]}`;
            }
        }

        this[_mime][name] = res;
    }

    /**
     * build the MIME
     *
     * @return {Object} of key/value pairs.
     */
    build() {
        return this[_mime];
    }

}

