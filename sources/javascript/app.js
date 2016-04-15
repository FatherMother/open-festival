var App = (function () {
  "use strict";
  var
  
  init = function () {
    AutoWidth.init();
    BgIcons.init();
  };
  
  return {init: init};
  
} ());
$(function () {
  "use strict";
  App.init();
});