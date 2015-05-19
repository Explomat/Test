var Router = require('./router.js');
var UI = require('./utils/UI.js');

Router.startRouting(function(){
  var curElem = UI.getElementByHash('app-container', window.location.hash);
  if (curElem && curElem.parentNode)
    UI.toggleList(curElem.parentNode, 'active');
});
