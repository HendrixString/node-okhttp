'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.objectToQueryString = objectToQueryString;
exports.mimeStringArrayToObject = mimeStringArrayToObject;
var TAG = 'FormatUtils:: ';

/**
 * convert a key/value object into a query string
 *
 * @param keyValueObject a key/value object
 *
 * @returns {String} a query string
 */
function objectToQueryString(keyValueObject) {
    var value = null;
    var res = '';
    var keyValue = void 0;

    if (keyValueObject === null) return '';

    for (var key in keyValueObject) {
        if (!keyValueObject.hasOwnProperty(key)) continue;

        value = keyValueObject[key].toString();
        keyValue = key + '=' + value;
        res += res === '' ? '?' + keyValue : '&' + keyValue;
    }

    return res;
}

/**
 * convert a mime string array into key/value Object.
 * <pre>
 *     mimeStringArrayToObject(['Content-Type:image/jpg', 'Content-ID: myid'])
 *     ==>
 *     {
 *          'Content-Type': 'image/jpg',
 *          'Content-ID': 'myid',
 *     }
 * </pre>
 *
 * @param {Array} mimes array of strings that each represent a mime header.
 *
 * @return {Object} a key/value Object
 */
function mimeStringArrayToObject(mimes) {
    if (!Array.isArray(mimes)) return mimes;

    var keyValue = {};

    var msg = TAG + 'mimeStringArrayToObject(..) --> mimes array is not formatted correctly';

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = mimes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (typeof item !== 'string') {
                console.warn(msg);
                continue;
            }

            var arr = item.split(':');

            if (arr.length > 2) {
                console.warn(msg);
                continue;
            }

            keyValue[arr[0].trim()] = arr[1].trim();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return keyValue;
}