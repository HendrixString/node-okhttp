'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _mime = Symbol();

/**
 * <code>MIME Builder</code> pattern for faster constructions of <code>MIME</code> Header
 *
 * @author Tomer Shalev
 */

var MimeBuilder = function () {
    function MimeBuilder() {
        _classCallCheck(this, MimeBuilder);

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


    _createClass(MimeBuilder, [{
        key: 'contentType',
        value: function contentType(value) {
            for (var _len = arguments.length, extra = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                extra[_key - 1] = arguments[_key];
            }

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

    }, {
        key: 'version',
        value: function version(value) {
            for (var _len2 = arguments.length, extra = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                extra[_key2 - 1] = arguments[_key2];
            }

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

    }, {
        key: 'contentID',
        value: function contentID(value) {
            for (var _len3 = arguments.length, extra = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                extra[_key3 - 1] = arguments[_key3];
            }

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

    }, {
        key: 'contentLocation',
        value: function contentLocation(value) {
            for (var _len4 = arguments.length, extra = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                extra[_key4 - 1] = arguments[_key4];
            }

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

    }, {
        key: 'contentDescription',
        value: function contentDescription(value) {
            for (var _len5 = arguments.length, extra = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                extra[_key5 - 1] = arguments[_key5];
            }

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

    }, {
        key: 'contentDisposition',
        value: function contentDisposition(value) {
            for (var _len6 = arguments.length, extra = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                extra[_key6 - 1] = arguments[_key6];
            }

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

    }, {
        key: 'contentTransferEncoding',
        value: function contentTransferEncoding(value) {
            for (var _len7 = arguments.length, extra = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                extra[_key7 - 1] = arguments[_key7];
            }

            this.addMimeHeader('Content-Transfer-Encoding', value, extra);

            return this;
        }

        /**
         *
         * @param name
         * @param value
         * @param {Array} extra
         */

    }, {
        key: 'addMimeHeader',
        value: function addMimeHeader(name, value, extra) {
            var res = value;

            var cParams = extra.length;

            if (cParams % 2 == 0) {
                for (var ix = 0; ix <= extra.length - 2; ix += 2) {
                    res += '; ' + extra[ix + 0] + '=' + extra[ix + 1];
                }
            }

            this[_mime][name] = res;
        }

        /**
         * build the MIME
         *
         * @return {Object} of key/value pairs.
         */

    }, {
        key: 'build',
        value: function build() {
            return this[_mime];
        }
    }]);

    return MimeBuilder;
}();

exports.default = MimeBuilder;