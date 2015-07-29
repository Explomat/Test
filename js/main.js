var Router = require('./router');
var UI = require('./utils/UI');

Router.startRouting(function(){
  var curElem = UI.getElementByHash('app-container', window.location.hash);
  if (curElem)
    UI.toggleList(curElem, 'active');
});
