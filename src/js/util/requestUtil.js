exports.getJSON = function(url, query, type, callback){
    var option = {
        url: url,
        type: type || 'GET',
        data: query || {},
        dataType: 'json',
        cache: false,
        success: function(data, textStatus, jqXHR){
            if(typeof callback === 'function') callback(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus);
        }
    };

    $.ajax(option);
};
