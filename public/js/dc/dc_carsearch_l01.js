!function(t){function e(s){if(n[s])return n[s].exports;var o=n[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,s){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=29)}({10:function(t,e){var n=function(){alert("UI TAB")};t.exports=n},2:function(t,e){},29:function(t,e,n){n(2),n(4);var s=n(9),o=n(10);new s({obj:".newest_area",speed:500,auto:4e3,showArrow:!0,mouseswipe:!0,showNavi:!0,showPlay:!0}),console.log(111),o()},4:function(t,e){},9:function(t,e){function n(){for(var t="transform WebkitTransform MozTransform OTransform".split(" "),e=document.createElement("div"),n=0;n<t.length;n++)if(e&&e.style[t[n]]!==undefined)return!0;return!1}var s=jQuery.noConflict(),o=function(t){this.init(t)};o.prototype={init:function(t){this.cacheElement(t),this.setEvent()},cacheElement:function(t){(t.auto||t.showPlay)&&(t.loop=!0),this.item=".scene",this.obj=t.obj,this.first=t.first||1,this.scene=t.scene,this.speed=t.speed||1e3,this.auto=t.auto||0,this.hover=t.hover,this.mouseswipe=t.mouseswipe,this.navi=t.showNavi,this.arrow=t.showArrow,this.number=t.showNumber,this.pause=t.showPlay,this.bg=t.showBG,this.loop=0!=t.loop||t.loop,this.fnSlideend=t.fnSlideend,this.pauseChk="",this.tgW=s(this.obj),this.tgR=this.tgW.find(".showRoll>ul"),this.tgI="",this.pos=this.tgR.find(this.item).outerWidth(),this.css3check=n(),this.intRoll=""},setEvent:function(){var t=this,e=t.loop?"shadow":"shadow hidden",n=t.tgR.find(t.item+":first"),o=t.tgR.find(t.item+":last");s(n).clone().appendTo(t.tgR).addClass(e),s(o).clone().prependTo(t.tgR).addClass(e),t.tgI=t.tgR.find(t.item),"fade"==t.scene?t.tgI.not(".shadow").css({position:"absolute",left:0,top:0}):t.tgR.css({left:0}),t.navi&&t.ifNavi(),t.arrow&&t.ifArrow(),t.number&&s('<div class="showNumber"><strong></strong>/<span></span></div>').clone().appendTo(t.tgW),t.hover&&t.ifHover(),t.bg&&t.ifBG(),t.mouseswipe&&t.ifMouseSwipe(),t.fnMove(t.first,"fxNon"),t.tgR.css({width:100*(t.rtItemLength()+2)+"%"}),t.auto&&(t.pauseChk=!0,t.fnAuto()),t.pause&&t.ifPause()},fxFade:function(t,e){var n=this;n.css3check?n.tgI.css({zIndex:0,opacity:0,transition:n.speed/1e3+"s"}).removeClass("on").eq(t).addClass("on").css({zIndex:1,opacity:1}).stop().animate({top:0},n.speed,function(){n.tgI.removeClass("action").eq(t).addClass("action")}):n.tgI.css({zIndex:0}).stop().animate({opacity:0},n.speed).removeClass("on").eq(t).addClass("on").css({zIndex:1}).stop().animate({opacity:1},n.speed,function(){n.tgI.removeClass("action").eq(t).addClass("action")})},fxSlide:function(t,e){var n=this,s=n.pos*t,o=0==t,a=n.rtItemLength(),i=o?n.tgI.eq(a):t==a+1?n.tgI.eq(1):"",r=n.css3check?{transition:"fxNon"==e?"0s":n.speed/1e3+"s",transform:"translate(-"+s+"px, 0px)"}:{top:0},u=n.css3check?{top:0}:{left:"-"+s+"px"};n.tgR.addClass("wait").css(r).stop().animate(u,n.speed,function(){if(n.tgR.removeClass("wait").find(n.item).removeClass("action").eq(t).add(i).addClass("action"),n.fnSlideend&&n.fnSlideend(o?a:t==a+1?1:t),o||t==a+1){var e;e=o?a:1;var s=n.css3check?{transition:"0s",transform:"translate(-"+n.pos*e+"px, 0px)"}:{left:"-"+n.pos*e+"px"};return void n.tgR.css(s).find(n.item).removeClass("on action").eq(e).addClass("on action")}}).find(n.item).removeClass("on").eq(t).add(i).addClass("on")},fnMove:function(t,e){var n=this;if(!n.loop){var s=n.rtItemLength();0==t?t=1:t>s&&(t=s),n.arrow&&n.fnArrow(t,s)}"fade"==n.scene?n.fxFade(t,e):n.fxSlide(t,e),n.navi&&n.fnNavi(t),n.number&&n.fnNumber(),n.bg&&n.fnBG(),"loop"==e?n.fnAuto():(clearTimeout(n.intRoll),n.pause&&n.tgW.find(".showPlay a.pause").click())},fnAuto:function(t,e,n,s){var o=this,a=o.auto||3e3,i=Number(o.rtItemCurrent().attr("data-auto"))||a;if("pause"!=t)return clearTimeout(o.intRoll),void(o.intRoll=setTimeout(function(){o.fnMove(o.rtFade("next"),"loop")},i+o.speed));clearTimeout(o.intRoll)},fnNumber:function(){var t=this,e=t.tgW.find(".showNumber");total=t.rtItemLength(),current=t.rtItemCurrent().index(),e.find("strong").html(0==current?total:current),e.find("span").html(total)},fnNavi:function(t){var e=this;e.rtItemLength()<t&&(t=1),e.tgN.removeClass("on").eq(t-1).addClass("on"),isNaN(e.navi)&&e.tgNm.removeClass("on").eq(t-1).addClass("on")},ifNavi:function(){var t=this,e="";t.tgI.not(".shadow").each(function(n){e+='<a href="#'+t.obj+(n+1)+'"><span>'+(n+1)+"</span></a>"}),s('<div class="showNavi">'+e+"</div>").clone().appendTo(t.tgW),t.tgN=t.tgW.find(".showNavi a"),t.tgNm=s(t.navi),t.tgN.on({click:function(){var e=s(this).index();return s(this).hasClass("on")||t.fnMove(e+1),s(this).add(t.tgNm.eq(e)).addClass("on").siblings(".on").removeClass("on"),!1}}).eq(t.rtItemCurrent().index()-2).addClass("on"),isNaN(t.tgNm)&&t.tgNm.on({click:function(){return t.tgN.eq(s(this).index()).click(),!1}}).eq(t.rtItemCurrent().index()-2).addClass("on")},fnBG:function(){var t=this,e=(t.rtItemCurrent().index()-1)/(t.rtItemLength()-1)*100;t.tgW.find(".showBG").css({backgroundPosition:e+"% 0"})},ifBG:function(){var t=this;btncon='<div class="showBG"><span></span></div>',s(btncon).clone().appendTo(t.tgW)},fnMouseSwipe:function(t,e){var n=this;t-e>30?n.fnMove(n.rtFade("next")):e-t>30?n.fnMove(n.rtFade("prev")):n.fnMove(n.rtItemCurrent().index())},ifMouseSwipe:function(){var t=this,e=["touchstart mousedown","touchmove.uiSlideEvent mousemove.uiSlideEvent","touchend.uiSlideEvent mouseup.uiSlideEvent mouseleave.uiSlideEvent"];t.tgW.on(e[0],function(n){var s=t.pos*t.rtItemCurrent().index()-2,o=n.type!=e[0].split(" ",1),a=o?n:n.originalEvent.touches[0],i=a.pageX,r=a.pageX,u=t.rtItemCurrent().find("a");o&&n.preventDefault(),u.off(".uiSlideFindLink"),jQuery(this).on(e[1],function(e){if(a=o?e:e.originalEvent.touches[0],"fade"!=t.scene){r=a.pageX;var n=Number(i-r)+Number(s);Math.abs(i-r)>4&&u.on("click.uiSlideFindLink",function(t){t.preventDefault()}),t.tgR.css({transform:"translate(-"+n+"px, 0px)",transition:"0s"})}r=a.pageX}).on(e[2],function(e){t.tgW.off(".uiSlideEvent"),i!=a.pageX&&(r=a.pageX,t.fnMouseSwipe(i,r))})})},ifHover:function(){var t=this;t.tgW.on({mouseenter:function(){t.pauseChk&&t.fnAuto("pause")},mouseleave:function(){t.pauseChk&&t.fnAuto()}})},fnArrow:function(t,e){var n=this,s=n.tgW.find(".showArrow"),o="disiable";t==e&&1==e?s.find("a").addClass(o):t==e?(s.find("a.next").addClass(o),s.find("a.prev").removeClass(o)):1==t?(s.find("a.prev").addClass(o),s.find("a.next").removeClass(o)):s.find("a").removeClass(o)},ifArrow:function(){var t=this;s('<div class="showArrow"><a href="#prev" class="prev"><span>prev</span></a><a href="#next" class="next"><span>next</span></a></div>').clone().appendTo(t.tgW),t.tgW.find(".showArrow a").on({click:function(){var e;return s(this).hasClass("next")?e=t.rtFade("next"):s(this).hasClass("prev")&&(e=t.rtFade("prev")),t.fnMove(e),!1}})},ifPause:function(){var t=this;s('<div class="showPlay"><a href="#play" class="play"><span>Play</span></a><a href="#pause" class="pause"><span>Pause</span></a></div>').clone().appendTo(t.tgW),t.tgW.find(".showPlay a").on({click:function(){return s(this).hasClass("play")?(t.fnAuto(),t.pauseChk=!0):s(this).hasClass("pause")&&(t.fnAuto("pause"),t.pauseChk=!1),s(this).addClass("on").siblings().removeClass("on"),!1}}),t.auto?t.tgW.find(".showPlay a.play").addClass("on"):t.tgW.find(".showPlay a.pause").addClass("on")},rtItemLength:function(){return this.tgI.length-2},rtItemCurrent:function(){return this.tgI.siblings(".on:first")},rtFade:function(t){var e=this;return"next"==t?"fade"==e.scene&&e.loop&&e.rtItemCurrent().next().hasClass("shadow")?1:e.rtItemCurrent().next().index():"prev"==t?"fade"==e.scene&&e.loop&&e.rtItemCurrent().prev().hasClass("shadow")?e.rtItemLength():e.rtItemCurrent().prev().index():void 0}},t.exports=o}});