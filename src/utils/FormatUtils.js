'use strict';

/**
 * convert a key/value object into a query string
 *
 * @param keyValueObject a key/value object
 *
 * @returns {String} a query string
 */
export function objectToQueryString(keyValueObject) {
    var value        = null;
    var res          = '';
    let keyValue;

    if(keyValueObject === null)
        return '';

    for (let key in keyValueObject) {
        if(!keyValueObject.hasOwnProperty(key))
            continue;

        value        = keyValueObject[key].toString();
        keyValue     = key + '=' + value;
        res         += res==='' ? '?' + keyValue : '&' + keyValue;
    }

    return res;
}
