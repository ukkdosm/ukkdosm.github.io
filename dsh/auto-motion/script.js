$(window).load(function(){
	var aTween = new TimelineMax({repeat: -1});
	var uTween = new TimelineMax({repeat: -1, repeatDelay: 0.53});
	var tTween = new TimelineMax({repeat: -1});
	var oiTween = new TimelineMax({repeat: -1});
	var ooTween = new TimelineMax({repeat: -1, repeatDelay: 0.63});
	var dashTween = new TimelineMax({repeat: -1});

	var mTween = new TimelineMax({repeat: -1, repeatDelay: 4});
	var a2Tween = new TimelineMax({repeat: -1});
	var t2hTween = new TimelineMax({repeat: -1});
	var iTween = new TimelineMax({repeat: -1, repeatDelay: 2.6});
	var o2Tween = new TimelineMax({repeat: -1, repeatDelay: 2.2});
	var ntTween = new TimelineMax({repeat: -1, repeatDelay: 1});

	aTween
		.from('#A', 1.2, {scaleY: 0.1, scaleX: 1.1, transformOrigin:'50% 100%', ease: Elastic.easeOut.config(1, 0.3)})
		.to('#A', 0.46, {scaleY: 0.1, transformOrigin:'50% 100%', ease: Elastic.easeOut.config(1, 1), delay: 1});

	uTween
		.from('#Ucircle', 0.66, {y: -35}, 0.33)
		.from('#Utop', 0.66, {y: -52}, 0.33)
		.to("#Ucircle", 0.5, {rotation: 360, ease: Power2.easeOut, transformOrigin:'50% 50%', delay: 0.36})
		.to('#Ucircle', 0.46, {y: -35, delay: 0.16})
		.to('#Utop', 0.46, {y: -52}, '-=0.46');

	tTween
		.from("#Th", 0.53, {skewY: -20, scaleX: 0, transformOrigin:'left top', ease: Power2.easeOut})
		.to("#Tv", 0.33, {scaleX: 0, transformOrigin:'left top', ease: Power2.easeOut}, 0.33)
		.set("#Tv", {xPercent:100})
		.to("#Tv", 0.33, {scaleX: 1, transformOrigin:'right top', ease: Power2.easeOut})
		.to("#Th", 0.36, {skewY: 20, scaleX: 0, transformOrigin:'right top', ease: Power2.easeOut, delay: 0.33});

	oiTween
		.from("#Oinner", 0.40, {xPercent: 200}, 0.66)
		.to("#Oinner", 0.5, {xPercent: 163, scaleX: 0.7, delay: 3, ease: Power2.easeOut})
		.to("#Oinner", 0.66, {xPercent: 200, scaleX: 1, ease: Elastic.easeOut.config(1, 0.4)});

	ooTween
		.to("#Oouter", 0.53, {scale: 0.6, transformOrigin:'50% 50%'}, 3.6)
		.to("#Oouter", 0.18, {scale: 1, ease: Elastic.easeOut.config(1, 0.5)});

	dashTween
		.fromTo("#dash", 0.66, {scaleX: 0.8, x:88}, {scaleX: 0.6, x:40, ease: Power2.easeOut})
		.to("#dash", 0.8, {scaleX: 1, x:30, transformOrigin:'right top', ease: Elastic.easeOut.config(1, 0.4)})
		.to("#dash", 0.66, {scaleX: 0.6, x:88, transformOrigin:'right top', ease: Power2.easeOut}, 4.56)


	mTween
		.to('#MbottomEl', 0.33, {skewY: 46, transformOrigin: 'right top'})
		.to('#MrightEl', 0.33, {skewX: -46, transformOrigin: 'left top'})
		.fromTo('#Mleft', 0.33, {scaleX: 0}, {scaleX: 1, transformOrigin: 'left top', delay: 0.5})	
		.to('#MbottomEl', 0.33, {skewY: 0, transformOrigin: 'right top'})			
		.to('#MrightEl', 0.33, {skewX: 0, transformOrigin: 'left top'})

	a2Tween
		.set('#A2', {scale: 0.1, autoAlpha: 1, transformOrigin: 'center top'})
		.fromTo('#A2', 1, {y: -20}, {y: 0})
		.to('#A2', 0.26, {scaleY: 1})
		.to('#A2', 0.56, {scaleX: 1})
		.to('#A2', 0.43, {scaleX: 0.1, delay: 2.8})
		.to('#A2', 0.33, {scaleY: 0.1, y: -20})

	t2hTween
		.to('#T2h', 0.2, {x: 43, scaleX: 0.6, ease: Power2.easeOut, delay: 1.6})
		.to('#T2h', 0.16, {x: 0, scaleX: 1, delay: 0.13})
		.to('#T2h', 0.6, {y: 58, ease: Power2.easeOut, delay: 1})
		.to('#T2h', 0.16, {x: -50, scaleX: 0.5, delay: 0.26})
		.set('#T2h', {scaleY: 0, scaleX: 1, y: 0, x: 0})
		.to('#T2h', 0.5, {scaleY: 1, delay: 0.5})

	iTween
		.to('#I', 0.5, {rotation: 35, transformOrigin: 'bottom right', ease: Power2.easeOut}, 1.7)
		.to('#I', 0.33, {rotation: 0, transformOrigin: 'bottom right', ease: Elastic.easeOut.config(1, 0.4)})

	o2Tween
		.to('#O2inner', 0.2, {scale: 1.5, transformOrigin: 'center', yoyo: true, repeat: 1}, 2)
		.to('#O2inner', 0.2, {x: 64})
		.set('#O2inner', {x: -64})
		.to('#O2inner', 0.2, {x: 0})

	ntTween
		.fromTo('#NtEl', 1, {scaleY: 0, skewX: -21, transformOrigin: 'bottom'}, {scaleY: 1, skewX: 0, ease: Elastic.easeOut.config(1, 0.5)}, 0.33)
		.fromTo('#Nr', 0.5, {scaleX: 0, transformOrigin: 'right'}, {scaleX: 1}, 0.33)
		.to('#NtEl', 0.16, {delay: 0.83, xPercent: 100})
		.to('#Nr', 0.36, {scaleY: 0, transformOrigin: 'bottom'})
		.set('#NtEl', {xPercent: 0, skewX: 0}, 3)
		.fromTo('#NtEl', 1, {scaleY: 0, skewX: -21, transformOrigin: 'bottom'}, {scaleY: 1, skewX: 0, ease: Elastic.easeOut.config(1, 0.5)})
		.to('#Nr', 0.36, {scaleY: 1, transformOrigin: 'bottom'})
		.to('#NtEl', 0.16, {delay: 0.83, xPercent: 100, delay: 1})
		.to('#Nr', 0.36, {scaleY: 0, transformOrigin: 'bottom'})


});