!function(n){function t(e){if(r[e])return r[e].exports;var u=r[e]={i:e,l:!1,exports:{}};return n[e].call(u.exports,u,u.exports,t),u.l=!0,u.exports}var r={};t.m=n,t.c=r,t.i=function(n){return n},t.d=function(n,r,e){t.o(n,r)||Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:e})},t.n=function(n){var r=n&&n.__esModule?function(){return n["default"]}:function(){return n};return t.d(r,"a",r),r},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="/",t(t.s=8)}([function(n,t){},function(n,t){t.getSubString=function(n,t,r){return n.substring(t,r)},t.replaceString=function(n,t,r){return n.replace(t,r)}},,function(n,t){},,,function(n,t){var r={isNull:function(n){return null===n}};n.exports=r},,function(n,t,r){r(0),r(3);var e=r(1),u=r(1).replaceString,i=r(6);alert("legacy IE"),alert("use string util: "+e.getSubString("JUNGHO SON",7,10)),alert("use string util: "+u("JUNGHO SON","JUNGHO","RICK")),alert("use validation util: "+i.isNull(null))}]);