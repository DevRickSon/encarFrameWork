var RYVUSS = {
		// 국산/수입일 경우
		CAR : {
			ryvussSimilar   : 'http://api.encar.com' + "/search/car/list/similar",
		    ryvussGeneral	: 'http://api.encar.com' + "/search/car/list/general",
			ryvussPremium	: 'http://api.encar.com' + "/search/car/list/premium",
			ryvussDirect	: 'http://api.encar.com' + "/search/car/list/direct",		// 직영
			ryvussWarrnty	: 'http://api.encar.com' + "/search/car/list/warranty",		// 보증
			ryvussCompensate: 'http://api.encar.com' + "/search/car/list/compensate",	// 헛걸음
			ryvussLease		: 'http://api.encar.com' + "/search/car/list/lease",		// 리스
			ryvussBrand		: 'http://api.encar.com' + "/search/car/list/brand",		// 브랜드인증
			navPostProcessing : function(nav) {
				var n = nav, f;

				if (n.CarType.IsSelected) {
					/* 국산수입 여부 :선택 */
					(n.CarType0 = (function() {
						for ( var l = n.CarType.Facets, i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).IsSelected)
								return o;
						}
					})())
					/* 제조사 */
					&& (n.Manufacturer = (function() {
						for ( var l = (n.CarType0.Refinements || {}).Nodes || [], i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).Name == "Manufacturer")
								return o;
						}
					})())
					/* 제조사 :선택 */
					&& (n.Manufacturer0 = (function() {
						if (n.Manufacturer.IsSelected) {
							for ( var l = n.Manufacturer.Facets, i = 0, len = l.length, o; i < len; i += 1) {
								if ((o = l[i]).IsSelected)
									return o;
							}
						}
					})())
					/* 모델그룹 */
					&& (n.ModelGroup = (function() {
						for ( var l = (n.Manufacturer0.Refinements || {}).Nodes || [], i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).Name == "ModelGroup")
								return o;
						}
					})())
					/* 모델그룹 :선택 */
					&& (n.ModelGroup0 = (function() {
						if (n.ModelGroup.IsSelected) {
							for ( var l = n.ModelGroup.Facets, i = 0, len = l.length, o; i < len; i += 1) {
								if ((o = l[i]).IsSelected)
									return o;
							}
						}
					})())
					/* 모델(세부) */
					&& (n.Model = (function() {
						for ( var l = (n.ModelGroup0.Refinements || {}).Nodes || [], i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).Name == "Model")
								return o;
						}
					})())
					/* 모델(세부) :선택 */
					&& (n.Model0 = (function() {
						if (n.Model.IsSelected) {
							for ( var l = n.Model.Facets, i = 0, len = l.length, o; i < len; i += 1) {
								if ((o = l[i]).IsSelected)
									return o;
							}
						}
					})())
					/* 등급필터 */
					&& (n.BadgeGroup = (function() {
						for ( var l = (n.Model0.Refinements || {}).Nodes || [], i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).Name == "BadgeGroup")
								return o;
						}
					})())
					/* 등급필터 :선택(컨텐츠영역에서 사용) */
					&& (n.BadgeGroup0 = (function() {
						if (n.BadgeGroup.IsSelected) {
							for ( var l = n.BadgeGroup.Facets, i = 0, len = l.length, o; i < len; i += 1) {
								if ((o = l[i]).IsSelected)
									return o;
							}
						}
					})())
					/* 등급 (컨텐츠영역에서 사용) */
					&& (n.Badge = (function() {
						for ( var l = (n.BadgeGroup0.Refinements || {}).Nodes || [], i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).Name == "Badge")
								return o;
						}
					})())
					/* 등급 : 선택한 모든 등급필터에 대한 등급리스트 */
					&& (n.BadgeList = (function() {
						var arrL = [];
						for ( var l = (n.BadgeGroup || {}).Facets || [] , i = 0, len = l.length, o ; i < len ; i++ ) {
							if ((o = l[i]).IsSelected) {
								var nodes = (o.Refinements || {}).Nodes[0];
								arrL = arrL.concat(nodes.Facets || []);
							}
						}
						return {
							Facets : arrL
						};
					})())
					/* 등급 :선택(컨텐츠영역에서 사용) */
					&& (n.Badge0 = (function() {
						if (n.Badge.IsSelected) {
							for ( var l = n.Badge.Facets, i = 0, len = l.length, o; i < len; i += 1) {
								/* 원래는 복수 선택이나 여기선 첫번째 선택만을 반환한다. */
								if ((o = l[i]).IsSelected)
									return o;
							}
						}
					})())
                    /* 세부등급 (컨텐츠영역에서 사용) */
					&& (n.BadgeDetail = (function() {
						for ( var l = (n.Badge0.Refinements || {}).Nodes || [], i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).Name == "BadgeDetail")
							    return o;
						}
						return {
							Facets : ''
						};
					})())
					/* 세부등급 :선택(컨텐츠영역에서 사용) */
					&& (n.BadgeDetail0 = (function() {
						if (n.BadgeDetail.IsSelected) {
							for ( var l = n.BadgeDetail.Facets, i = 0, len = l.length, o; i < len; i += 1) {
								/* 원래는 복수 선택이나 여기선 첫번째 선택만을 반환한다. */
								if ((o = l[i]).IsSelected)
									return o;
							}
						}
					})())
					;
				}
			}
		},
		// 화물, 특장, 버스
		TRUCK : {
			ryvussGeneral	: 'http://api.encar.com' + "/search/truck/list/general",
			ryvussPremium	: 'http://api.encar.com' + "/search/truck/list/premium",
			ryvussDirect	: 'http://api.encar.com' + "/search/truck/list/direct",		// 직영
			navPostProcessing : function (nav) {
				var n = nav, f;

				/*- 형식, 이하 ------------------------------------------------------------------------------------- */
				/* 형식 :선택 */
				(n.Form0 = (function() {
					if (n.Form.IsSelected) {
						for ( var l = n.Form.Facets, i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).IsSelected)
								return o;
						}
					}
				})())
				/* 세부형식 */
				&& (n.FormDetail = (function() {
					for ( var l = n.Form0.Refinements.Nodes, i = 0, len = l.length, o; i < len; i += 1) {
						if ((o = l[i]).Name == 'FormDetail')
							return o;
					}
				})())
				/* 세부형식 :선택 */
				&& (n.FormDetail0 = (function() {
					if (n.FormDetail.IsSelected) {
						for ( var l = n.FormDetail.Facets, i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).IsSelected)
								return o;
						}
					}
				})())
				/* 적재용량 */
				&& (n.Capacity = (function() {
					for ( var l = n.FormDetail0.Refinements.Nodes, i = 0, len = l.length, o; i < len; i += 1) {
						if ((o = l[i]).Name == 'Capacity')
							return o;
					}
				})())
				/* 적재용량 - AND 조건 */
				&& (n.Capacity2 = (function() {
					for ( var l = n.FormDetail0.Refinements.Nodes, i = 0, len = l.length, o; i < len; i += 1) {
						if ((o = l[i]).Name == 'Capacity2')
							return o;
					}
				})())
				/* 적재규격 */
				&& (n.Standard = (function() {
					for ( var l = n.FormDetail0.Refinements.Nodes, i = 0, len = l.length, o; i < len; i += 1) {
						if ((o = l[i]).Name == 'Standard')
							return o;
					}
				})());

				/*- 제조사, 이하 ----------------------------------------------------------------------------------- */
				/* 제조사 :선택 */
				(n.Manufacturer0 = (function() {
					if (n.Manufacturer.IsSelected) {
						for ( var l = n.Manufacturer.Facets, i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).IsSelected)
								return o;
						}
					}
				})())
				/* 모델 */
				&& (n.Model = (function() {
					for ( var l = n.Manufacturer0.Refinements.Nodes, i = 0, len = l.length, o; i < len; i += 1) {
						if ((o = l[i]).Name == 'Model')
							return o;
					}
				})())
				/* 모델(세부) :선택 */
				&& (n.Model0 = (function() {
					if (n.Model.IsSelected) {
						for ( var l = n.Model.Facets, i = 0, len = l.length, o; i < len; i += 1) {
							if ((o = l[i]).IsSelected)
								return o;
						}
					}
				})())
				/* 등급 */
				&& (n.Badge = (function() {
					for ( var l = (n.Model0.Refinements || {}).Nodes || [], i = 0, len = l.length, o; i < len; i += 1) {
						if ((o = l[i]).Name == "Badge")
							return o;
					}
				})());
			}
		},

		// 네비게이션 호출
		getNavigation :
			function (options) {
				var defaultOpt = {
						car : this.CAR,
						url : this.CAR.ryvussGeneral,
						query : "",
						beforeSend : undefined,
						success : undefined
				}

				var opt = jQuery.extend({}, defaultOpt, options);

				var ryvData = {
						count : false,
						q : opt.query,
						inav : "|Metadata|Sort"
				}


				var ajaxOpt = {};

				if ( this.UTIL.IS_IE7_LESS ) {
					ajaxOpt = {
						dataType : 'jsonp',
						jsonp : '_jsonp'
					};
				} else {
					ajaxOpt = {
						dataType : 'json'
					};
				}

				jQuery.ajax(jQuery.extend({}, ajaxOpt, {
					url			: opt.url,
					crossDomain : true,
					scriptCharset : 'utf-8',
					data : jQuery.param(ryvData),
					beforeSend : function(e){
						if ( typeof opt.beforeSend !== "undefined" ) {
							opt.beforeSend(e);
						}
					},
					success : function(result) {

						// search.main.abstract.js - requestRyvussInav
						var n = {}, b = {};

						/*- UI 로직을 돕기 위해 라이버스의 네비게이션 구조(array)를 매핑(to map)한다. */
						for ( var l = result.iNav.Nodes, i = 0, len = l.length, o; i < len; i += 1) {
							o = l[i];
							if (o.Name == 'Mileage' && o.Type == 'RangeAction') {
								n['MileageRange'] = o;
							} else if (o.Name == 'Price' && o.Type == 'RangeAction') {
								n['PriceRange'] = o;
							} else {
								n[o.Name] = o;
							}
						}

						opt.car.navPostProcessing(n);

						/* 선택한 조건들에 대한 지표 */
						for ( var l = result.iNav.BreadCrumbs, i = 0, len = l.length, o, a, f; i < len; i += 1) {
							if ((a = b[(o = l[i]).Aspect || o.IndexName]) == null) {
								a = {};
								b[o.Aspect || o.IndexName] = a;
							}
							if (o.Type == 'FacetBreadCrumb') {
								if ((f = a[o.Type]) == null) {
									f = [];
									a[o.Type] = f;
								}
								f.push(o);
							} else {
								a[o.Type] = o;
							}
						}

						var typeofFunc = typeof func;
						if ( typeof opt.success === "function" ) {
							opt.success(n, b);
						}
					}
				}));
			},
	getCarData :
		function (options){
			/**
			 * opt
			 * -
			 * - query : 라이버스 쿼리
			 * - sr : sort 정보 (없으면 sort, nowPage, perPage로 생성 - 있으면 바로 넣도록)
			 * -- sort : 정렬조건 (기본 - ModifiedDate)
			 * -- nowPage : 현재 페이지 (기본 - 1)
			 * -- perPage : 페이지당 노출 차량수 (기본 - 20)
			 * - beforeSend : AJAX 전송 전 실행
			 * - success : AJAX 성공 후 실행
			 * - url : AJAX 호출 URL 없으면 (car.ryvussPremium)
			 * ex)
		{
			car : CR,
			query : "",
			sr : "|ModifiedDate|1|9", // 최근등록순으로 페이지당 9개씩 1페이지
			success : run
		}

		// 최근등록순으로 페이지당 9개씩 10페이지
		{
			car : CR,
			query : "",
			nowPage : 10,
			perPage : 9,
			success : run,	// Function
			beforeSend : before	// Function
		}
			 */
			var defaultOpt = {
					car : this.CAR,
					query : "",
					sr : {
						sort : "ModifiedDate",
						nowPage : 1,
						perPage : 20
					},
					beforeSend : function () {

					},
					success : function (){

					},
					url : this.CAR.ryvussPremium
			}

			if ( typeof options === "undefined" || typeof options.car === "undefined" ) {
				return ;
			}

			var opt = jQuery.extend({}, defaultOpt, options);

			var car = opt.car;
			var sr = "";
			if ( typeof opt.sr === "undefined" || typeof opt.sr === "object" ) {
				sr = "|";
				var sort = typeof opt.sort === "undefined" ? "ModifiedDate" : opt.sort;
				var nowPage = typeof opt.nowPage === "undefined" ? 1 : parseInt(opt.nowPage);
				nowPage = isNaN(nowPage) ? 1 : nowPage;
				var ItemsPerPage = typeof opt.perPage === "undefined" ? 20 : parseInt(opt.perPage);
				ItemsPerPage = isNaN(ItemsPerPage) ? 1 : ItemsPerPage;
				var nowItemFromPage = (nowPage - 1) * ItemsPerPage;

				sr = "|" + sort + "|" + nowItemFromPage + "|" + ItemsPerPage;
			} else {
				sr = opt.sr;
			}

			var url = opt.url;
			if ( typeof url === "undefined" ) {
				url = car.ryvussPremium;
			}

			var ryvData = {
					count : true,
					q : opt.query,
					sr : sr
			};

			var ajaxOpt = {};

			if ( this.UTIL.IS_IE7_LESS ) {
				ajaxOpt = {
					dataType : 'jsonp',
					jsonp : '_jsonp'
				};
			} else {
				ajaxOpt = {
					dataType : 'json'
				};
			}

			jQuery.ajax(jQuery.extend({}, ajaxOpt, {
				url			: url,
				crossDomain : true,
				scriptCharset : 'utf-8',
				data : jQuery.param(ryvData),
				beforeSend : function(e){
					if ( typeof opt.beforeSend !== "undefined" ) {
						opt.beforeSend(e);
					}
				},
				success : function(result) {
					if ( typeof opt.success !== "undefined" ) {
						opt.success(result);
					}
				}
			}));

		},
		UTIL : {
			IS_IE7_LESS : document.all && !document.querySelector,
			yearFormTextToString : // 연식 표시
				function (data, gbn) {
					if ( data.Year === undefined && data.FormYear === undefined ) {
						return "";
					}
					var s = String(data.Year), fully = s.substring(0, 4), y = s.substring(2, 4), m = s.substring(4, 6), fy = (data.FormYear || '');

					if ( fy ) {
						var numS = parseInt(s.substring(0, 4), 10);
						var numFy = parseInt(fy.substring(0, 4), 10);

						if ( numS > numFy ) {
							y = fy.substring(2, 4);
							m = "12";
							fy = undefined;
						}
					}

					var exp = [y, '/', m];
					if ( !!fy && fully != fy ) {
						exp.push( ( gbn !== undefined ? "식<".concat(gbn).concat(">") : "식" ) + '('.concat(fy.substring(2, 4)).concat('년형)') + ( gbn !== undefined ? "</".concat(gbn).concat(">") : "" ) );
					} else {
						exp.push("식");
					}
					return exp.join('');
				},
			defText : // 기본 텍스트 지정
				function (str) {
					return str == undefined ? "" : str;
				},
			formatDate : // DATE 포맷팅
				function (str, format) {
					var reg = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
					if ( reg.test(str) ) {
						var tmpStr = format;
						var regO = reg.exec(str);
						var yyyy = regO[1];
						var yy = yyyy.substr(2);
						var MM = regO[2];
						var dd = regO[3];
						var hh = regO[4];
						var mm = regO[5];
			            var ss = regO[6];
			            tmpStr = tmpStr.replace("yyyy", yyyy);
			            tmpStr = tmpStr.replace("yy", yy);
			            tmpStr = tmpStr.replace("MM", MM);
			            tmpStr = tmpStr.replace("dd", dd);
			            tmpStr = tmpStr.replace("hh", hh);
			            tmpStr = tmpStr.replace("mm", mm);
			            tmpStr = tmpStr.replace("ss", ss);
			            return tmpStr;
					} else {
						return str;
					}
				},
			modelStartEndYear :	// 모델 연식 표시
				function (data) {
					if (!data){
						return '';
					}

					var md = data.Metadata, text = [ data.DisplayValue ];
					if ( md.ModelStartDate === undefined || md.ModelEndDate === undefined ) {
						return "";
					}
					var sy = md.ModelStartDate.join('').substring(2, 4), ey = md.ModelEndDate.join('').substring(2, 4);
					if (sy || ey) {
						text.push('(', (sy ? (ey ? sy : sy.concat('년')) : '현재'), '~', (ey ? ey.concat('년') : '현재'), ')');
					}
					return text.join('');
				},
			modelStartEndYearText :	// 모델 연식 표시
					function (data) {
					if (!data){
						return '';
					}

					var md = data.Metadata, text = [];
					if ( md.ModelStartDate === undefined || md.ModelEndDate === undefined ) {
						return "";
					}
					var sy = md.ModelStartDate.join('').substring(2, 4), ey = md.ModelEndDate.join('').substring(2, 4);
					if (sy || ey) {
						text.push('(', (sy ? sy.concat('년') : '현재'), '~', (ey ? ey.concat('년') : '현재'), ')');
					}
					return text.join('');
				},
			inText : // 텍스트 검색시 사용
				function (targetSep, txt) {
					if ( targetSep === undefined ) {
						return false;
					}
					return targetSep.join("").indexOf(txt) > -1;
				},
			brandCertImage : // 브랜드 인증 Class
				function (data) {

					var imgNm = "";
					var mnfc = data.Manufacturer;

					if(mnfc == '아우디'){
						imgNm = "audicert";
					}else if(mnfc == 'BMW'){
						imgNm = "bmwbps";
					}else if(mnfc == '벤츠'){
						imgNm = "benzcert";
					}else if(mnfc == '폭스바겐'){
						imgNm = "vwuc";
					}else if(mnfc == '미니'){
						imgNm = "minicert";
					}else if(mnfc == '포르쉐'){
						imgNm = "porschecert";
					}else if(mnfc == '롤스로이스'){
						imgNm = "rrcert";
					}else if(mnfc == '재규어'){
						imgNm = "jaguarcert";
					}else if(mnfc == '랜드로버'){
						imgNm = "landrovercert";
					}else if(mnfc == '렉서스'){
						imgNm = "lexuscert";
					}

					return imgNm;
				},
			hotmarkMap :	// 핫마크
				{
					'01' : '개인판매차량',
					'02' : '급매차량',
					'03' : '가격절충가능차량',
					'04' : 'LPG 차량',
					'05' : '오디오부착차량',
					'06' : '임시번호판 차량',
					'07' : '장애인차량',
					'08' : '튜닝차량',
					'09' : '특옵션차량',
					'10' : '1인소유차량',

					'11' : '할부가능차량',
					'12' : '정비완료차량',
					'13' : '상태양호차량',
					'14' : '인기 차량',
					'15' : '인기 차량',
					'17' : '최저가구매가능차량',
					'18' : '카드구매가능차량',
					'19' : '짧은주행거리차량',
					'20' : '4륜구동차량',

					'21' : '리스승계차량',
					'22' : '계산서발행가능차량',
					'23' : '여성주행차량',
					'24' : '비흡연차량',
					'26' : '제조사AS가능차량',
					'27' : '정식수입차량',
					'28' : '24시간상담가능',
					'29' : '준신차'
				}
		}
};

module.exports = RYVUSS;
