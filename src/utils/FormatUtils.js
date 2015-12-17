'use strict';

const TAG = 'FormatUtils:: ';

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
export function mimeStringArrayToObject(mimes) {
    if(!Array.isArray(mimes))
        return mimes;

    let keyValue     = {};

    let msg = TAG + 'mimeStringArrayToObject(..) --> mimes array is not formatted correctly';

    for(let item of mimes) {
        if(typeof item !== 'string') {
            console.warn(msg);
            continue;
        }

        let arr = item.split(':');

        if(arr.length > 2) {
            console.warn(msg);
            continue;
        }

        keyValue[arr[0].trim()] = arr[1].trim();
    }

    return keyValue;
}
