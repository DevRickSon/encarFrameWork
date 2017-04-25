require('css/common.css');
require('css/pr.css');

var stringUtil = require('js/util/stringUtil');
var replaceString = require('js/util/stringUtil').replaceString;
var validationUtil = require('js/util/validationUtil');

alert('legacy IE');
alert('use string util: ' + stringUtil.getSubString('JUNGHO SON', 7, 10));
alert('use string util: ' + replaceString('JUNGHO SON', 'JUNGHO', 'RICK'));
alert('use validation util: ' + validationUtil.isNull(null));