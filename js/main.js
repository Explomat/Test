var Router = require('./router.js');
var UI = require('./utils/UI.js');

Router.startRouting(function(){
  var curElem = UI.getElementByHash('app-container', window.location.hash);
  if (curElem)
    UI.toggleList(curElem, 'active');
});
