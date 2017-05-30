console.log('This is the main js file, it will be concatonated wth the partial js file on publication');

var quickReveal = 0.25;
var slowReveal = 0.75;

// initAd is run when the greensock library has loaded
// keep all code within initAd()
function initAd() {
  console.log('initAd');
    var tl = new TimelineMax({paused:false});
    tl.staggerTo('.header', 2, {alpha:1, delay:0}, slowReveal);
    tl.staggerTo('.logo', 2, {alpha:1, delay:0}, quickReveal);
}

