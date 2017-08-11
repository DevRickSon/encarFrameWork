var sammy = require('sammy');

var ROUTE = {
    sign: '#!',
    setRoute: function(fnc){
        var self = this;

        sammy(function(){
            this.get(self.sign.concat(':intent?'), fnc);
        }).run(this.sign);
    }
};

module.exports = ROUTE;
