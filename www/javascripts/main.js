/* All js here */

$(function(){
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
})
