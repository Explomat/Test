var _Router = require('./router');
var UI = require('./utils/UI');

window.onload = function(){
	var Router = new _Router({ defaultRoute: '#settings', interval: 100, callBack: function(){
		  var curElem = UI.getElementByHash('app-container', window.location.hash);
		  if (curElem)
		    UI.toggleList(curElem, 'active');
		}
	});

	Router.addRoute('#settings', function(){
		var Controller = require('./controllers/QuestionController');
		var controller = new Controller();
		controller.start(arguments[0]);
	}).
	addRoute('#structure', function(){
		var Controller = require('./controllers/StructureController');
		var controller = new Controller();
		controller.start(arguments[0]);
	}).startRouting();
}


