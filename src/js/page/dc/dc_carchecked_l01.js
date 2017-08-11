//import css
require('css/common.scss');

//import dependencies
var RYVUSS = require('config/config.ryvuss'),
    ROUTE = require('config/config.route'),
    search = require('js/components/search');

//page value
var defaultQuery = 'And.Hidden.N._.CarType.Y._.Separation.B.',
    currentQuery = defaultQuery,
    state = {
        company: '',
        modelgroup: '',
        model: '',
        category: '',
        categorycd: '',
        stdmndprc: '',
        enddmndprc: '',
        listType: 'img',
        pagenum: '',
        carType: ''
    },
    searchUI;

//initialize
init();

function init(){
    setSearch();
    setRoute();
}

function setSearch(){
    searchUI = search(RYVUSS, state, defaultQuery, currentQuery, runRoute);
}

function setRoute(){
    ROUTE.setRoute(function(context){
        var defaultOpt = {
            action : '(' + defaultQuery + ')',
            pagenum : '1',
            category : '',
            categorycd : '',
            stdmndprc : '',
            enddmndprc : '',
            listType : 'img'
        };

        var opt = $.extend(defaultOpt, JSON.parse(context.params.intent || '{}'));

        // 차량분류 선택시 설정
        searchUI.setCarType(opt.categorycd);

        // 기본값 설정
        var arrValues = ['pagenum', 'stdmndprc', 'enddmndprc', 'listType', 'category'];
        for(var i=0, len=arrValues.length; i < len; i++){
            var id = arrValues[i];
            state[id] = opt[id];

            // 리스트/이미지형 변경되었을 시 설정
            if(id === 'listType') {
                //setListType(value);
            }else if(id === 'stdmndprc'){
                searchUI.setPrice('start', state[id]);
            }else if(id === 'enddmndprc'){
                searchUI.setPrice('end', state[id]);
            }
        }

        searchUI.setSortList(opt.action);
        getData(opt.action);
    });
}

function runRoute(query) {
	// 시작가격, 끝가격 보정
	query = query.replace(/\._\.Price\.range\((.[0-9\.]+)\)/, '' );

    var stdmndprc 		= state.stdmndprc;
	var enddmndprc 		= state.enddmndprc;

	if(stdmndprc === null || stdmndprc === undefined) stdmndprc = '';
	if(enddmndprc === null || enddmndprc=== undefined) enddmndprc = '';
	if(stdmndprc !== '' || enddmndprc !== ''){
		var prc = '._.Separation.B._.Price.range(' + stdmndprc + '..' + enddmndprc + ')';
		query = query.replace(/\._\.Separation\.B/, prc );
	}

    var opt = {
		action : query,
		pagenum : state.pagenum,
		category : state.category,
		categorycd : state.categorycd,
		stdmndprc : stdmndprc,
		enddmndprc : enddmndprc,
		listType : state.listType
	};

	location.hash = ROUTE.sign + encodeURIComponent(JSON.stringify(opt));
}

// function getData(query){
//     !!!query  && ( query = '(' + defaultQuery + ')' );
//     currentQuery = query;
// }

// 데이터 가져오기
function getData(query){

	!!!query  && ( query = '(' + defaultQuery + ')' );

	currentQuery = query;
    var CR = RYVUSS.CAR;

	var param = {
		car : CR,
		url : CR.ryvussWarrnty,
		query : query,
		nowPage : state.pagenum,
		perPage : 9,
		success : function(result){

			// 필요 Function

			var cnt = result.Count;
			var sr = result.SearchResults;
			var listType = state.listType;
			listType = ( listType == '' ) ? 'img' : listType;			// listType 보정

			//$('#l_carchecked').focus();										// 엔카보증차량 메뉴에 포커싱
			$('#totalCnt').val(cnt);										// 리스트 갯수 가져오기

			var mainlist = ''; 				// 메인리스트
			if ( sr.length > 0 ) {			// if1. 데이터 존재시
				if (listType == '' || listType == 'img'){			// if2. 이미지형일때
					//mainlist = dotTmplCarItemImage({list:sr});
				} else {		// if2. 리스트형일때
					//mainlist = dotTmplCarItemList({list:sr});
				}
			}else{	// if1. 데이터 미존재시
				//mainlist = dotTmplNoItems();
			}
			$('#img_list').html(mainlist);								// 메인리스트 페이지출력

	       	/************************************
	       	 * STEP 2. PAGGING 출력
	       	 ************************************/
	       	var pagelist = '';
	       	// 페이지 셋팅
			var nowPage = state.pagenum;
	       	nowPage = (nowPage == '') ? 1 : parseInt(nowPage);
	       	var ItemsPerPage = 9;				// 페이지당 차량 수
	       	var maxPage = Math.ceil( cnt / ItemsPerPage );
	       	var pageTen = Math.floor( nowPage / 10 );	// 페이지 위치 (10단위)
	       	if ( (nowPage % 10) === 0 ) {		// 현재 페이지가 10의 배수일 경우에 대한 보정
	       		pageTen = pageTen - 1;
	       	}
	       	pageTen = pageTen * 10;
	       	var nowPageMin = pageTen + 1;		// 현재 페이지 목록 첫번째 숫자
	       	var nowPageMax = pageTen + 10;		// 현재 페이지 목록 마지막 숫자
	       	if ( nowPageMax >= maxPage ) {
	       		nowPageMax = maxPage;
	       	}

	       	var pageParam = {
					nowPage : nowPage,
					nowPageMin : nowPageMin,
					nowPageMax : nowPageMax,
					maxPage : maxPage
			};

	       	$//('#page_list').html(dotTmplPaging(pageParam));	// 페이징 출력

			//loadingBar('out'); 						// 데이터 수신 종료
			//getDataSameList();						// 동급매물조회
			//insCheckedSearchParam('', '');			// 진단검색 리스트 검색내역 db인서트
		},
		beforeSend : function(){
			//loadingBar('in');
		}
	}

	RYVUSS.getCarData(param);

	return ;

}
