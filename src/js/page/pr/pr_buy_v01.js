//import css
// require('css/common.css');
// require('css/pr.css');
require('css/pr.scss');

//import dependencies
var URL = require('config/config.url'),
    $ = require('jquery'),
    getJSON = require('js/util/requestUtil').getJSON,
    tmpl = require('tmpl/dc/warranty.handlebars');

//initialize
init();

function init(){
    setEvent();
}

function setEvent(){
    $('button').on('click', function(){
        setWarranty();
    });
}

function setWarranty(){
    var url = URL.warranty,
        query = {
            count: true,
            sr: '|ModifiedDate|0|5',
            q: '(And.(And.Hidden.N._.(C.CarType.Y._.Manufacturer.현대.))_.Separation.B.)'
        };

    getJSON(url, query, 'GET', function(data){
        $('.tmpl_warranty').empty().append(tmpl(data));
    });
}
