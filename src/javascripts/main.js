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
  $('.toc a').click(function(e) {
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
    html += '<!DOCTYPE html><html><head><title>HTMLHunden example</title></head><body>';
    html += '<div style="width:100px; height:100px; background:red; margin: 6px;"></div>';
    html += '</body></html>';
  }
  html += '<div style="width:100px; height:100px; background:blue; position:fixed; left:30px; top:20px;"></div>';
  var iframe = document.getElementById('example-css-position-fixed');
  iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
  iframe.document.open();
  iframe.document.write(html);
  iframe.document.close();
}


/*
 * TOC
 */
lathunden.TOC = {};
lathunden.TOC.init = function(){
  setTimeout(function(){
  $('.toc').toc({
      'selectors': 'h1,h2',
      'container': '#chapters',
      'highlightOnScroll': true,
      'highlightOffset': 100,
      'anchorName': function(i, heading, prefix) {
        var slug = $(heading).text().trim().replace(/[^\w\s]/gi, '').toLowerCase().replace(/ /g,'-');
        return slug;
      }
    });
  }, 4000);
}



/*
 * Initalizer
 */

lathunden.init = function(){
  lathunden.Anchors.init();
  lathunden.Examples.init();
  lathunden.TOC.init();
}
