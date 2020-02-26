var _script = document.createElement('script');
var r = Math.ceil(Math.random()*10000);
_script.setAttribute('src','/static/tracking/public/js/geo.js?t='+r);
document.head.appendChild(_script);
var _css = document.createElement('link');
_css.setAttribute('href','/static/tracking/public/css/geo.css?t='+r);
_css.setAttribute('rel','stylesheet');
document.head.appendChild(_css);
