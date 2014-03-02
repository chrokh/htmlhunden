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
    e.preventDefault();
    var href = $.attr(this, 'href').substring(1);
    var selector = "*[id='" + href + "']";
    var $elem = $(selector).first();
    $root.animate({
        scrollTop: $elem.offset().top
    }, 500, function () {
        window.location.hash = href;
    });
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


lathunden.TOC = {};
lathunden.TOC.init = function(){
  this.visible = false;
  $('#toggle-toc').click(function(){ lathunden.TOC.toggleVisibility() });
};
lathunden.TOC.toggleVisibility = function(){
  if(this.visible)
    this.hide();
  else
    this.show();
}
lathunden.TOC.show = function(){
  this.visible = true;
  this.lastContentY = $('body').scrollTop();
  $('#toc-single').animate({'width': '100%'}, function(){
    $('#toc-single').addClass('visible');
    $('body').scrollTop(0);
    $('#single').css('display','none');
  });
}
lathunden.TOC.hide = function(){
  this.visible = false;
  $('#toc-single').removeClass('visible');
  $('#single').css('display', 'block');
  $('body').scrollTop(this.lastContentY);
  $('#toc-single').animate({'width':'50px'});
}




/*
 * Initalizer
 */

lathunden.init = function(){
 lathunden.TOC.init();
  //lathunden.Anchors.init();
  //lathunden.Examples.init();
  //$('#chapters h1').find('a').removeAttr('href'); //TODO: Clean out all the anchors cuz they are broken
  //$('#chapters h2').find('a').removeAttr('href'); //TODO: Clean out all the anchors cuz they are brokn
}
