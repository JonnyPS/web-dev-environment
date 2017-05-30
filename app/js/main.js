console.log('This is the main js file, it will be concatonated wth the partial js file on publication');


function initAd() {
  console.log('initAd');
    var tl = new TimelineMax({paused:false});
    tl.to(headerOne, 1, {alpha:0, onComplete:sayhi, delay:0});

    function sayhi() {
      console.log('sayhi')
    }
}

