/*
 * Namespace
 */
var lathunden = window.lathunden = {}


/*
 * jQuery Load
 */

$(function(){
  lathunden.init();
})


/*
 * Anchors
 */

lathunden.Anchors = {}
lathunden.Anchors.init = function(){
  var $root = $('html, body');
  $('a').click(function(e) {
      var href = $.attr(this, 'href').substring(1);
      var selector = "*[name='" + href + "']";
      var $elem = $(selector);
      $root.animate({
          scrollTop: $elem.offset().top
      }, 500, function () {
          window.location.hash = href;
      });
      return false;
  });
}



/*
 * Examples
 */

lathunden.Examples = {};
lathunden.Examples.CSSPositionFixed = {}
lathunden.Examples.init = function(){
  lathunden.Examples.CSSPositionFixed.init();
}
lathunden.Examples.CSSPositionFixed.init = function(){
  var html = '';
  for(var i=0; i<20; i++){
    html += '<div style="width:100px; height:100px; background:red; margin: 6px;"></div>';
  }
  html += '<div style="width:100px; height:100px; background:blue; position:fixed; left:30px; top:20px;"></div>';
  $('iframe#example-css-position-fixed')[0].contentWindow.document.write(html);
}



/*
 * Initalizer
 */

lathunden.init = function(){
  lathunden.Anchors.init();
  lathunden.Examples.init();
}