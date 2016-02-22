# node-OkHttP
a lightweight `HTTP` library for `Node.js` inspired by `Square's Android OkHttp` Builder patterns and flavours
for constructing a legit `HTTP` requests of all types.
Written entirely in EcmaScript 6 (Harmony) and transpiled with `Babel`.

[![NPM](https://nodei.co/npm/okhttp.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/okhttp/)

## How to use
- `npm install okhttp`
- `npm install --production okhttp` (if you have the following modules installed globally `babel-cli, babel-plugin-transform-object-assign,babel-preset-es2015`,
then use)


## Features
- supports all `HTTP` methods.
- supports MultiPart requests.
- includes Builders for:
  - `Request` builder.
  - `Form Encoding` body builder.
  - `Multipart` body builder.
  - `Mime` builder.
  - `Request Body` composer.
- use `Promise` api for intuitive async.
- most important: quick and easy to use.

## Guide
```javascript
const okhttp                = require('okhttp');

var MimeBuilder             = okhttp.MimeBuilder;
var Request                 = okhttp.Request;
var RequestBody             = okhttp.RequestBody;
var RequestBuilder          = okhttp.RequestBuilder;
var FormEncodingBuilder     = okhttp.FormEncodingBuilder;
var MultiPartBuilder        = okhttp.MultiPartBuilder;

/**
 * @param msg a {data, response, request} Object
 */
private function onComplete(msg):void {
    console.log('data ' + msg.data + ', response ' + msg.response.statusCode + ', request ' + msg.request.method);
}

private function onError(err):void {
    console.error(err);
}

```


#### 1) Simple textual `GET` request

```javascript
new RequestBuilder().GET('http://google.com').buildAndExecute().then(onComplete).catch(onError);

```

#### 2) Simple binary `GET` request
- data returns as a buffer

```javascript
new RequestBuilder().GET('http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png').bufferResponse().buildAndExecute().then(onComplete).catch(onError);

```

#### 2) Simple `JSON POST` request

```javascript
new RequestBuilder().url('http://httpbin.org/post')
                    .POST(RequestBody.create({a:'a1', b:'b1'}, new MimeBuilder().contentType('application/json', 'charset', 'utf8').build()))
                    .buildAndExecute().then(onComplete).catch(onError);

```

#### 3) `Form Encoding POST (www-form-urlencoded)` request

```javascript
let fe_body = new FormEncodingBuilder().add('key1', 'value1').add('key2', 'value2').build();

new RequestBuilder().url('http://httpbin.org/post').POST(fe_body).buildAndExecute()
                    .then(onComplete).catch(onError);

```

#### 4) `MultiPart` request: 
- send a multipart file upload request to Google Drive API
- to obtain token, use [https://developers.google.com/oauthplayground/](https://developers.google.com/oauthplayground/)
```javascript
let json    = JSON.stringify({title:'test'});
var image   = fs.readFileSync(path.resolve(__dirname, 'test.jpg'));

let mp_body = new MultiPartBuilder().addPart(RequestBody.create(json, 'Content-Type: application/json; charset=UTF-8'))
                                    .addPart(RequestBody.create(image, new MimeBuilder().contentType('image/jpeg').contentTransferEncoding('binary').build()))
                                    .type(MultiPartBuilder.FORMDATA).build();

new RequestBuilder().url('https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart')
                    .header('Authorization', 'Bearer OAUTH2_TOKEN_HERE')
                    .POST(mp_body).buildAndExecute().then(onComplete).catch(onError);

```

#### 5) `POST` image request
- send an image into `Google Glass Mirror API`

```javascript
public function uploadImage(image, itemId, oauthToken):void {

      var body = RequestBody.create(image, 'Content-Type: image/png');
      
      new RequestBuilder().url("https://www.googleapis.com/upload/mirror/v1/timeline" + "/" + itemId + "/attachments")
                          .query("access_token", oauthToken)
                          .POST(body).build().execute()
                          .then(onComplete).catch(onError);
}

```

### Dev Dependencies
* [`babel-cli`](https://github.com/babel/babel/tree/master/packages/babel-cli)
* [`babel-preset-es2015`](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015)
* [`babel-plugin-transform-object-assign`](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-object-assign)

### Terms
* completely free source code. [Apache License, Version 2.0.](http://www.apache.org/licenses/LICENSE-2.0)
* if you like it -> star or share it with others

### Contact Author
* [tomer.shalev@gmail.com](tomer.shalev@gmail.com)
* [Google+ TomershalevMan](https://plus.google.com/+TomershalevMan/about)
* [Facebook - HendrixString](https://www.facebook.com/HendrixString)
