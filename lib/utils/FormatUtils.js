'use strict'

/**
 * convert a key/value object into a query string
 *
 * @param keyValueObject a key/value object
 *
 * @returns {String} a query string
 */
;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.objectToQueryString = objectToQueryString;
function objectToQueryString(keyValueObject) {
    var value = null;
    var res = '';
    var keyValue = undefined;

    if (keyValueObject === null) return '';

    for (var key in keyValueObject) {
        if (!keyValueObject.hasOwnProperty(key)) continue;

        value = keyValueObject[key].toString();
        keyValue = key + '=' + value;
        res += res === '' ? '?' + keyValue : '&' + keyValue;
    }

    return res;
}