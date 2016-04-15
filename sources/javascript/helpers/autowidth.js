var AutoWidth = (function () {
  "use strict";
  var $window = $(window),
      wW = window.innerWidth,
      $html = $('html'),
  
  calcRem = function () {
    var baseWw = 1366, x, rs;
    if (wW > baseWw) {
      wW = baseWw;
    }
    x = 1 / baseWw * wW;
    rs = 10 * x;
    $html.css('fontSize', rs + 'px');
  },
  
  isInView = function ($el) {
    
    var scrollPos = $window.scrollTop(),
        wH = $window.height(),
        offset = $el.offset().top,
        elH = parseInt($el.css('height')),
        t = $el.data('treshold') || 0;
    return (((scrollPos+t) <= offset) && ((scrollPos+wH-t) >= (offset+elH)));
    
  },
  
  faidAll = function () {
    
    var els = $('.js');
    
    els.each(function (i, item) {
        var that = $(item),
            d = that.data('delay') || 0;      
      if (isInView(that)) {
        setTimeout(function () {
          that.removeClass('js');
        }, d);
      }
    });
    
  },
  
  init = function () {
    calcRem();
    $window.on('resize', $.debounce(200, function () {
      if (wW === window.innerWidth) {
        return false;
      }
      wW = window.innerWidth;
      calcRem();
    }));
    $window.on('load', faidAll);
    $window.on('scroll', $.debounce(50, faidAll));
  };
  
  return { init: init };
  
}());