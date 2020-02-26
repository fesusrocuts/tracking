var r = Math.ceil(Math.random()*10000);
var _css = document.createElement('link');
_css.setAttribute('href','/static/tracking/public/css/default.css?t='+r);
_css.setAttribute('rel','stylesheet');
document.head.appendChild(_css);

var _script = document.createElement('script');
_script.setAttribute('src','/static/tracking/public/firebase/init.js?t='+r);
_script.setAttribute('defer','');
document.head.appendChild(_script);
