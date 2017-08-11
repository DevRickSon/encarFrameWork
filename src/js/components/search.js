require('css/dc.scss');

var commify = require('js/util/stringUtil').commify,
    tmplCompany = require('tmpl/dc/optsCompany.handlebars'),
    tmplModelGroup = require('tmpl/dc/optsModelGroup.handlebars'),
    tmplModelDetail = require('tmpl/dc/optsModelDetail.handlebars');

function search(ryvuss, state, defaultQuery, currentQuery, callback){
    var $carType = null,
        $company = null,
        $modelGroup = null,
        $model = null,
        $stdmndprc = null,
        $enddmndprc = null,
        $currentType = null;

    function init(){
        setCache();
        setEvent();
        resetPrice();
    }

    function setCache(){
        $carType = $('._f_car_type');
        $company = $('#companySearch');
        $modelGroup = $('#modelgroupSearch');
        $model = $('#modelSearch');
        $stdmndprc = $('#stdmndprc');
        $enddmndprc = $('#enddmndprc');
    }

    function setEvent(){
        $carType.on('click', function(e){
            var self = $(this),
                code = self.attr('data-code'),
                type = self.attr('data-type');

            resetCarType(self, code, type, '', '');
            return false;
        });

        $stdmndprc.on('change', function(){
            var val = $(this).val();
            state.stdmndprc = val;
            console.log(JSON.stringify(state));
            console.log('change: ', currentQuery);
            callback(currentQuery);
        });

        $enddmndprc.on('change', function(){
            var val = $(this).val();
            state.enddmndprc = val;
            callback(currentQuery);
        });

    	$company.on('click', 'li', function(e){
    		var $t = $(this).find('a');

    		if($t.length <= 0) return;

    		var query = $t.attr('data-action');

            state.pagenum = '1';
            state.company = $t.attr('data-code');
            state.modelgroup = '';
            state.model = '';

    		callback(query);
            return false;
    	});

    	$modelGroup.on('click', 'li', function(e){
    		var $t = $(this).find('a');

    		if($t.length <= 0) return;

    		var query = $t.attr('data-action');

            state.pagenum = '1';
            state.modelgroup = $t.attr('data-code');
            state.model = '';

    		callback(query);
            return false;
    	});

    	$model.on('click', 'li', function(e){
    		var $t = $(this).find('a');

            if($t.length <= 0) return;

    		var query = $t.attr('data-action');

            state.pagenum = '1';
            state.model = $t.attr('data-code');

            callback(query);
            return false;
    	});
    }

    function resetPrice(){
        var stdmndprc = state.stdmndprc;
    	var enddmndprc = state.enddmndprc;

    	createDmndprc('stdmndprc', 100, 10000, stdmndprc, '이상');		// 가격 (이상)
    	createDmndprc('enddmndprc', 100, 10000, enddmndprc, '이하');		// 가격 (이하)
    }

    function createDmndprc(id, start, end, selected, firstOptionText) {
    	var $t = $('#' + id);
    	$t.empty();
    	$t.append('<option value=\'\'>' + firstOptionText + '</option>');

    	var sumprc = 100;
    	var tmpHtml = '';
    	for ( var i = start ; i <= end ; i = i + sumprc ) {
    		tmpHtml += '<option value=\'' + i + '\'>' + commify(i) + ' 만원' + '</option>';
    		if (i >= 2000) {
    			sumprc = 1000;
    		}
    	}

    	$t.append(tmpHtml);

    	if ( isNaN(selected) ) {
    		$t.val(selected);
    	}
    }

    function setPrice(type, price){
        if(type === 'start') $stdmndprc.val(price);
        if(type === 'end') $enddmndprc.val(price);
    }

    function setCarType(categorycd){
        $carType.each(function(a){
            $(this).removeClass('on');
        });

        if ( categorycd !== '' ) {
            state.categorycd = categorycd;

            var $selectedType = $('.type').find('a[data-code='+ categorycd +']');
            $selectedType.addClass('on');
            $currentType = $selectedType;
        } else {
            state.categorycd = '';
        }
    }

    function resetCarType(target, type, typenm){
        state.pagenum = 1;
        state.company = '';
        state.modelgroup = '';
        state.model = '';
        state.categorycd = type;

    	var query =  '(' + defaultQuery + ')';

    	if (target.hasClass('on')){
    		target.removeClass('on');
            $currentType = null;

            state.category = '';
            state.categorycd = '';
    	} else {
            if($currentType){
                $currentType.removeClass('on');
            }
            target.addClass('on');
            $currentType = target;

            state.category = typenm;

    		query =  '(' + defaultQuery + '_.Category.' + typenm + '.)';
    		if(typenm === '승합차') query = '(' + defaultQuery + '_.(Or.Category.경승합차._.Category.승합차.))';
    	}

    	callback(query);
    }

    function setSortList(query){
    	!!!query && ( query = '(' + defaultQuery + ')' );

        var CR = ryvuss.CAR;

    	ryvuss.getNavigation({
    		car : CR,
    		url : CR.ryvussWarrnty,
    		query : query,
    		success : function(n, b) {
                var category = state.category;

                var setDisplay = function(items, viewFunc){
                    var len = items.length;

                    for(var i=0; i<len; i++){
                        var arr = items[i].Metadata.Category[0];
                        var view = true;
                        if(category !== ''){
                            view = $.inArray(category, arr) >= 0;

                            if(category === '승합차') view = ($.inArray('경승합차', items[i].Metadata.Category[0]) >= 0 ? true : false ) || view;
                        }

                        if(view && typeof viewFunc === 'function'){
                            items[i].DisplayValue = viewFunc(items[i]);
                        }

                        items[i].isView = view;
                    }

                    return items;
                };

                //제조사
                setDisplay(n.Manufacturer.Facets);
                $company.empty().append(tmplCompany(n.Manufacturer));

                //모델 그룹
                if(typeof n.Manufacturer0 !== 'undefined'){
                    var mdlGrp = [];
                    if(typeof n.ModelGroup !== 'undefined') mdlGrp = n.ModelGroup;
                    setDisplay(n.ModelGroup.Facets);
                }
                $modelGroup.empty().append(tmplModelGroup(n));

                //세부 모델
                if(typeof n.ModelGroup0 !== 'undefined'){
                    var mdl = [];
                    if(typeof n.Model !== 'undefined') mdl = n.Model;
                    setDisplay(mdl.Facets, ryvuss.UTIL.modelStartEndYear);
                }
                $model.empty().append(tmplModelDetail(n));
    		}
    	});
    }

    init();

    return {
        setCarType: setCarType,
        setPrice: setPrice,
        setSortList: setSortList
    };
}

module.exports = search;
