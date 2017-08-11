require('css/common.scss');
require('css/dc.scss');

var uiSlide = require('js/ui/uiSlide');
var uiTab = require('js/ui/uiTab');

//롤링
new uiSlide({
    obj:'.newest_area',
    speed:500,
    auto:4000,
    showArrow:true,
    mouseswipe:true,
    showNavi:true,
    showPlay:true
});

console.log(111);

uiTab();
