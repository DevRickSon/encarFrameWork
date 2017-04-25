/* 롤링 스크립트 (디폴트값)
new uiSlide({
	obj:'#testWrap',	//타겟
	first:2,			//첫장면 (1)
	scene:'fade',		//전환효과 slide, fade (slide)
	speed:500,			//전환속도 (1000)
	auto:3000,			//자동롤링 시간 (0)
	loop:false,			//무한루프
	hover:true,			//자동롤링 : 마우스 오버시 멈춤 (false)
	mouseswipe:true,	//마우스스와이프
	showNavi:'.target', //네비 true, false OR '.target' (false)
	showArrow:true,		//버튼 : 이전 다음 (false)
	showNumber:true,	//페이징 (false)
	showPlay:true,		//버튼 : 재생 멈춤 (false)
	showBG:true			//배경
});
*/


var jq$ = jQuery.noConflict();

var uiSlide = function(o){
	this.init(o);
};
uiSlide.prototype = {
	init : function(o){
		this.cacheElement(o);
		this.setEvent();
	},
	cacheElement : function(o){
		if (o.auto||o.showPlay) o.loop=true;
		this.item='.scene',
		this.obj=o.obj,
		this.first=o.first || 1,
		this.scene=o.scene,
		this.speed=o.speed || 1000,
		this.auto=o.auto || 0,
		this.hover=o.hover,
		this.mouseswipe=o.mouseswipe,
		this.navi=o.showNavi,
		this.arrow=o.showArrow,
		this.number=o.showNumber,
		this.pause=o.showPlay,
		this.bg=o.showBG,
		this.loop=(o.loop==false) ? o.loop : true,
		this.fnSlideend=o.fnSlideend,
		this.pauseChk='',
		this.tgW=jq$(this.obj),
		this.tgR=this.tgW.find('.showRoll>ul'),
		this.tgI='',
		this.pos=this.tgR.find(this.item).outerWidth(),
		this.css3check=getSupportedTransformIE10(),
		this.intRoll='';
	},
	setEvent : function(){
		var e$=this,
			shadowClass=(e$.loop) ? 'shadow' : 'shadow hidden',
			eleFirst=e$.tgR.find(e$.item+':first'),
			eleLast=e$.tgR.find(e$.item+':last');
			jq$(eleFirst).clone().appendTo(e$.tgR).addClass(shadowClass);
			jq$(eleLast).clone().prependTo(e$.tgR).addClass(shadowClass);
		e$.tgI=e$.tgR.find(e$.item); //재정의

		(e$.scene=='fade') ? e$.tgI.not('.shadow').css({position:'absolute',left:0,top:0}) : e$.tgR.css({left:0});
		if(e$.navi) e$.ifNavi();
		if(e$.arrow) e$.ifArrow();
		if(e$.number) jq$('<div class="showNumber"><strong></strong>/<span></span></div>').clone().appendTo(e$.tgW);
		if(e$.hover) e$.ifHover();
		if(e$.bg) e$.ifBG();
		if(e$.mouseswipe) e$.ifMouseSwipe();
		e$.fnMove(e$.first,'fxNon');
		e$.tgR.css({width:(e$.rtItemLength()+2)*100+'%'}); //width추가
		if(e$.auto){
			e$.pauseChk=true;
			e$.fnAuto();
		};
		if(e$.pause) e$.ifPause();
	},
	fxFade : function(go,how){
		var e$=this;
		if(e$.css3check){
			//css
			e$.tgI.css({zIndex:0,opacity:0,transition:e$.speed/1000+'s'}).removeClass('on').eq(go).addClass('on').css({zIndex:1,opacity:1}).stop().animate({top:0},e$.speed,function(){
				e$.tgI.removeClass('action').eq(go).addClass('action');
			});
		}else{
			//animate
			e$.tgI.css({zIndex:0}).stop().animate({opacity:0},e$.speed).removeClass('on').eq(go).addClass('on').css({zIndex:1}).stop().animate({opacity:1},e$.speed,function(){
				e$.tgI.removeClass('action').eq(go).addClass('action');
			});
		};
	},
	fxSlide : function(go,how){
		var e$=this,
			posX=e$.pos*(go),
			if1=go==0,	//first
			if2=e$.rtItemLength(),	//last
			real=(if1) ? e$.tgI.eq(if2) : (go==if2+1) ? e$.tgI.eq(1) : '';
		//css & animate
		var tgRcss=(e$.css3check) ? {transition:(how=='fxNon') ? '0s' : e$.speed/1000+'s',transform:'translate(-'+posX+'px, 0px)'} : {top:0},
			tgRani=(e$.css3check) ? {top:0} : {left:'-'+posX+'px'};
		e$.tgR.addClass('wait').css(tgRcss).stop().animate(tgRani,e$.speed,function(){
			e$.tgR.removeClass('wait').find(e$.item).removeClass('action').eq(go).add(real).addClass('action');
			if(e$.fnSlideend) e$.fnSlideend((if1) ? if2 : (go==if2+1) ? 1 : go);
			if(if1||go==if2+1){//사이드일때
				var sidePos;
				(if1) ?	sidePos=if2 : sidePos=1;
				var tgRcssSide=(e$.css3check) ? {transition:'0s',transform:'translate(-'+e$.pos*sidePos+'px, 0px)'} : {left:'-'+e$.pos*sidePos+'px'};
				e$.tgR.css(tgRcssSide).find(e$.item).removeClass('on action').eq(sidePos).addClass('on action');
				return;
			};
		}).find(e$.item).removeClass('on').eq(go).add(real).addClass('on');
	},
	fnMove : function(go,how){
		var e$=this;
		if(!e$.loop){
			var max=e$.rtItemLength();
			(go==0) ? go=1 : (go>max) ? go=max : '';
			if(e$.arrow) e$.fnArrow(go,max);
		};
		//if(!e$.tgR.hasClass('wait')){
			(e$.scene=='fade') ? e$.fxFade(go,how) : e$.fxSlide(go,how);
			if(e$.navi) e$.fnNavi(go);
			if(e$.number) e$.fnNumber();
			if(e$.bg) e$.fnBG();
			if(how=='loop'){
				e$.fnAuto();
			}else{
				clearTimeout(e$.intRoll);
				if(e$.pause) e$.tgW.find('.showPlay a.pause').click();
			};
		//};
	},
	fnAuto : function(value,auto,speed,over){
		var e$=this,
			time=e$.auto || 3000,
			dataAutoValue=Number(e$.rtItemCurrent().attr('data-auto')) || time;
		if(value!='pause'){
			clearTimeout(e$.intRoll);
			e$.intRoll=setTimeout(function(){
				e$.fnMove(e$.rtFade('next'),'loop');
			}, dataAutoValue+e$.speed);
			return;
		}else{
			clearTimeout(e$.intRoll);
		};
	},
	fnNumber : function(){
		var e$=this,
			tgNum=e$.tgW.find('.showNumber');
			total=e$.rtItemLength(),
			current=e$.rtItemCurrent().index();
		tgNum.find('strong').html((current==0)?total:current);
		tgNum.find('span').html(total);
	},
	fnNavi : function(go){
		var e$=this;
		if(e$.rtItemLength()<go) go=1; //초과될때는 1
		e$.tgN.removeClass('on').eq(go-1).addClass('on');
		if(isNaN(e$.navi)) e$.tgNm.removeClass('on').eq(go-1).addClass('on');
	},
	ifNavi : function(){
		var e$=this,
			tgNcon='';
		//마크업 생성
		e$.tgI.not('.shadow').each(function(i){
			tgNcon+='<a href="#'+e$.obj+(i+1)+'"><span>'+(i+1)+'</span></a>';
		});
		jq$('<div class="showNavi">'+tgNcon+'</div>').clone().appendTo(e$.tgW);

		e$.tgN=e$.tgW.find('.showNavi a'); //네비 버튼
		e$.tgNm=jq$(e$.navi); //추가 네비
		e$.tgN.on({
			click: function() {
				//if(!e$.tgR.hasClass('wait')){
					var num=jq$(this).index();
					if(!jq$(this).hasClass('on')) e$.fnMove(num+1);
					jq$(this).add(e$.tgNm.eq(num)).addClass('on').siblings('.on').removeClass('on'); //활성화
				//};
				return false;
			}
		}).eq(e$.rtItemCurrent().index()-2).addClass('on');
		if(isNaN(e$.tgNm)){ //추가 네비 설정시
			e$.tgNm.on({
				click:function(){
					e$.tgN.eq(jq$(this).index()).click(); //부모실행
					return false;
				}
			}).eq(e$.rtItemCurrent().index()-2).addClass('on');
		};
	},
	fnBG : function(){
		var e$=this,
			move=(e$.rtItemCurrent().index()-1)/(e$.rtItemLength()-1)*100;
		e$.tgW.find('.showBG').css({backgroundPosition:move+'% 0'});
	},
	ifBG : function(){
		var e$=this;
			btncon='<div class="showBG"><span></span></div>'
		jq$(btncon).clone().appendTo(e$.tgW); //마크업 생성
	},
	fnMouseSwipe : function(down_x,up_x){
		var e$=this,
			move=30;
		if((down_x-up_x)>move){
			e$.fnMove(e$.rtFade('next'));
		}else if((up_x-down_x)>move){
			e$.fnMove(e$.rtFade('prev'));
		}else{
			e$.fnMove(e$.rtItemCurrent().index());
		};
	},
	ifMouseSwipe : function(){
		var e$=this,
			eventCheck,
			evNamespace='.uiSlideEvent',
			moveEvent=['touchstart mousedown','touchmove'+evNamespace+' mousemove'+evNamespace,'touchend'+evNamespace+' mouseup'+evNamespace+' mouseleave'+evNamespace];
		e$.tgW.on(moveEvent[0], function(e){
			var posX=e$.pos*e$.rtItemCurrent().index()-2,
				eTypeCheck=e.type!=moveEvent[0].split(' ',1),
				eventCheck=(eTypeCheck) ? e : e.originalEvent.touches[0],
				down_x=eventCheck.pageX,
				up_x=eventCheck.pageX,
				findLink=e$.rtItemCurrent().find('a');
				if(eTypeCheck) e.preventDefault();
			findLink.off('.uiSlideFindLink');
			jQuery(this).on(moveEvent[1], function(e){
				eventCheck=(eTypeCheck) ? e : e.originalEvent.touches[0];
				if(e$.scene!='fade'){
					up_x=eventCheck.pageX;
						var diff=Number(down_x-up_x)+Number(posX);
					if(Math.abs(down_x-up_x)>4){
						findLink.on('click.uiSlideFindLink', function(e){
							e.preventDefault();
						});
					};
					e$.tgR.css({transform:'translate(-'+diff+'px, 0px)', transition:'0s'});
				};
				up_x=eventCheck.pageX;
			}).on(moveEvent[2], function(e){
				e$.tgW.off(evNamespace);
				if(down_x!=eventCheck.pageX){
					up_x=eventCheck.pageX;
					e$.fnMouseSwipe(down_x,up_x);
				};
			});
		});
	},
	ifHover : function(){
		var e$=this;
		e$.tgW.on({
			mouseenter:function(){
				if(e$.pauseChk) e$.fnAuto('pause');
			},mouseleave:function(){
				if(e$.pauseChk) e$.fnAuto();
			}
		});
	},
	fnArrow : function(go,max){
		var e$=this,
			arrowBtn=e$.tgW.find('.showArrow'),
			off='disiable';
		if(go==max&&max==1){
			arrowBtn.find('a').addClass(off);
		}else if(go==max){
			arrowBtn.find('a.next').addClass(off);
			arrowBtn.find('a.prev').removeClass(off);
		}else if(go==1){
			arrowBtn.find('a.prev').addClass(off);
			arrowBtn.find('a.next').removeClass(off);
		}else{
			arrowBtn.find('a').removeClass(off);
		};
	},
	ifArrow : function(){
		var e$=this,
			btncon=(
				'<div class="showArrow">'+
				'<a href="#prev" class="prev"><span>prev</span></a>'+
				'<a href="#next" class="next"><span>next</span></a>'+
				'</div>'
			);
		jq$(btncon).clone().appendTo(e$.tgW); //마크업 생성
		e$.tgW.find('.showArrow a').on({
			click: function(){
				var num;
				if(jq$(this).hasClass('next')){
					num=e$.rtFade('next');
				}else if(jq$(this).hasClass('prev')){
					num=e$.rtFade('prev');
				};
				e$.fnMove(num);
				return false;
			}
		});
	},
	ifPause : function(){
		var e$=this;
		jq$('<div class="showPlay"><a href="#play" class="play"><span>Play</span></a><a href="#pause" class="pause"><span>Pause</span></a></div>').clone().appendTo(e$.tgW);
		e$.tgW.find('.showPlay a').on({
			click: function(){
				if(jq$(this).hasClass('play')){
					e$.fnAuto();
					e$.pauseChk=true;
				}else if(jq$(this).hasClass('pause')){
					e$.fnAuto('pause');
					e$.pauseChk=false;
				};
				jq$(this).addClass('on').siblings().removeClass('on');
				return false;
			}
		});
		(e$.auto) ? e$.tgW.find('.showPlay a.play').addClass('on') : e$.tgW.find('.showPlay a.pause').addClass('on'); //버튼 활성화
	},
	rtItemLength : function(){
		var e$=this;
		return e$.tgI.length-2;
	},
	rtItemCurrent : function(){
		var e$=this;
		return e$.tgI.siblings('.on:first');
	},
	rtFade : function(value){
		var e$=this;
		if(value=='next'){
			return (e$.scene=='fade'&&e$.loop&&e$.rtItemCurrent().next().hasClass('shadow')) ? 1 : e$.rtItemCurrent().next().index();
		}else if(value=='prev'){
			return (e$.scene=='fade'&&e$.loop&&e$.rtItemCurrent().prev().hasClass('shadow')) ? e$.rtItemLength() : e$.rtItemCurrent().prev().index();
		}
	}
};
function getSupportedTransformIE10(){
	var prefixes='transform WebkitTransform MozTransform OTransform'.split(' '),
		div=document.createElement('div');
	for(var i=0;i<prefixes.length;i++) if(div&&div.style[prefixes[i]]!== undefined) return true;
	return false;
};

module.exports = uiSlide;