'use strict';

function onComplete(msg) {
    console.log('onComplete::: ' + msg.data + ' ****** ' + msg.response.statusCode);
}
function onError(msg) {
    console.log('onError::: ' + msg);
}

const fs                    = require('fs');
const path                  = require('path');

var image                   = fs.readFileSync(path.resolve(__dirname, 'test.jpg'));

var base                    = require('../lib/index');

var MimeBuilder             = base.MimeBuilder;
var Request                 = base.Request;
var RequestBody             = base.RequestBody;
var RequestBuilder          = base.RequestBuilder;
var FormEncodingBuilder     = base.FormEncodingBuilder;
var MultiPartBuilder        = base.MultiPartBuilder;

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
let json = JSON.stringify({title:'test'});

let mp_body = new MultiPartBuilder().addPart(RequestBody.create(json, 'Content-Type: application/json; charset=UTF-8'))
                                    .addPart(RequestBody.create(image, new MimeBuilder().contentType('image/jpeg').contentTransferEncoding('binary').build()))
                                    .type(MultiPartBuilder.FORMDATA).build();

var req3 = new RequestBuilder().url('https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart')
                               .header('Authorization', 'Bearer OAUTH2_TOKEN_HERE')
                               .POST(mp_body).buildAndExecute().then(onComplete).catch(onError);
