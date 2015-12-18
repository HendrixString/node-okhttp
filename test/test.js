'use strict';

/**
 *
 * @param msg a {data, response, request} Object
 */
function onComplete(msg) {
    console.log('onComplete::: ' + msg.data + ' ****** ' + msg.response.statusCode);
}
function onError(msg) {
    console.err('onError::: ' + msg);
}

const fs                    = require('fs');
const path                  = require('path');

const okhttp                = require('../');

var MimeBuilder             = okhttp.MimeBuilder;
var Request                 = okhttp.Request;
var RequestBody             = okhttp.RequestBody;
var RequestBuilder          = okhttp.RequestBuilder;
var FormEncodingBuilder     = okhttp.FormEncodingBuilder;
var MultiPartBuilder        = okhttp.MultiPartBuilder;

// Simple GET
new RequestBuilder().GET('http://google.com').buildAndExecute().then(onComplete).catch(onError);

// Simple JSON POST
new RequestBuilder().url('http://httpbin.org/post')
                    .POST(RequestBody.create({a:'a1', b:'b1'}, new MimeBuilder().contentType('application/json', 'charset', 'utf8').build()))
                    .buildAndExecute().then(onComplete).catch(onError);

// Form Encoding POST
let fe_body = new FormEncodingBuilder().add('key1', 'value1').add('key2', 'value2').build();

new RequestBuilder().url('http://httpbin.org/post').POST(fe_body).buildAndExecute().then(onComplete).catch(onError);

// MultiPart POST - Google Drive demo
// to obtain token, use https://developers.google.com/oauthplayground/
let json    = JSON.stringify({title:'test'});
var image   = fs.readFileSync(path.resolve(__dirname, 'test.jpg'));

let mp_body = new MultiPartBuilder().addPart(RequestBody.create(json, 'Content-Type: application/json; charset=UTF-8'))
                                    .addPart(RequestBody.create(image, new MimeBuilder().contentType('image/jpeg').contentTransferEncoding('binary').build()))
                                    .type(MultiPartBuilder.FORMDATA).build();

new RequestBuilder().url('https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart')
                    .header('Authorization', 'Bearer OAUTH2_TOKEN_HERE')
                    .POST(mp_body).buildAndExecute().then(onComplete).catch(onError);
