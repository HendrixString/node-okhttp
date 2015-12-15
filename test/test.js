/*var main = require('../index');
console.log(main)
var Re = main.Request;
var Reb = main.RequestBody;

(new Re()).test();
(new Reb()).test();*/
'use strict';
function onComplete(msg) {
    console.log('onComplete::: ' + msg);
}
function onError(msg) {
    console.log('onError::: ' + msg);
}

/*
var A = function(){
    this.a = function() {this.c ='c1'};
    this.b = function(on1, on2) {this.c ='c2'; on1(this.c)}
};

let a = new A();
a.a();
console.log(a.b);

let f =  a.b;
f.call(A);
//let pp = new Promise(a.b);
//pp.then(onComplete).catch(onError);
*/

var base            = require('../lib/index');

var MimeBuilder     = base.MimeBuilder;
var Request         = base.Request;
var RequestBody     = base.RequestBody;
var RequestBuilder  = base.RequestBuilder;

var req = new RequestBuilder().url('http://127.0.0.1:8888').header('Transfer-Encoding', 'chunked').header('X-MEN', 'tomer')
                              .POST(RequestBody.create({a:'a1', b:'b1'}, new MimeBuilder().contentType('application/json', 'charset', 'utf8').build()))
                              .build().execute().then(onComplete).catch(onError);
//var req = new RequestBuilder().GET('http://127.0.0.1:8888').build().execute().then(onComplete).catch(onError);


