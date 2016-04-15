var BgIcons = (function () {
  "use strict";
  var
  
  $window = $(window),
  $doc = $(document),
    wW = parseInt($window.width()),
  $body = $('body'),
    //bH = parseInt($body.css('height')),
    bH = $doc.innerHeight(),
  $allIcons,
  icons = ['guitar', 'microphone', 'drums', 'piano', 'saxophone', 'classical', 'drum2', 'electric', 'harp', 'instrument', 'musical-instrument'],
  hash = [],
  
  ICON_SIZE = 250,
  
  randomBetween = function (min, max) {
    return ((Math.random()*(max-min))+min);
  },
  
  gen3dprop = function () {
    if (arguments.length < 3) {
    var x = randomBetween(-3, 3),
        y = randomBetween(-3, 3),
        z = randomBetween(-3, 3);      
    } else {
    var x = arguments[0],
        y = arguments[1],
        z = arguments[2]; 
    }
    return ' transform: translate3d('+x+'rem, '+y+'rem, '+z+'rem);';
  },
  
  getIconNumber = function () {
    if (hash.length+1 == icons.length) {
      hash = [];
    }
    var i = Math.round(randomBetween(0, icons.length-1));
    
    while (hash.indexOf(i)+1) {
      i = Math.round(randomBetween(0, icons.length-1));
    }
    hash.push(i);
    return i;
  },
  
  generateIconsHtml = function (iconSize, colsCount, rowsCount) {
    for (var i = 0; i < rowsCount; i++) {
      for (var j = 0; j < colsCount; j++) {
        var left = iconSize*j,
            top = iconSize*i,
            iconNumber = getIconNumber(),
            pos = 'left: '+left+'rem; top: '+top+'rem;',
            s1 = pos + gen3dprop(),
            s2 = pos + gen3dprop(),
            s3 = pos + gen3dprop(),
            r = Math.round(randomBetween(0, 2)),
            ss = [s1, s2, s3];
        $body.prepend('<div style="'+ss[r]+'" class="icon-'+icons[iconNumber]+'-bg" data-state-1="'+s1+'" data-state-2="'+s2+'" data-state-3="'+s3+'"></div>');
      }
    }
  },
  
  scroll = function(event, delta, deltaX, deltaY) {
    $allIcons.each(function () {
      var r = Math.round(randomBetween(1, 3)),
          s = $(this).data('state-'+r);
      $(this).attr('style', s);
    });
  },
  
  init = function () {
    if ($window.length) {
      generateIconsHtml(((wW/6)/10), 6, Math.round((bH/10)/(ICON_SIZE/10)));
      $allIcons = $('[class*="-bg"]');
      $window.on('scroll mousemove', $.debounce(200, function () {
        scroll();
      }));
    }
  };
  
  return {init: init};
  
}());