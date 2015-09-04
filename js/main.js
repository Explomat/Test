var Router = require('./router');
var UI = require('./utils/UI');

window.onload = function(){

	Router.config({ defaultRoute: '#settings', interval: 100, callBack: function(){
		  var curElem = UI.getElementByHash('app-container', window.location.hash);
		  if (curElem)
		    UI.toggleList(curElem, 'active');
		}
	});

	Router.addRoute(/#settings/, function() {
		console.log(arguments);
	})
	.addRoute(/#structure/, function() {
		var Controller = require('./controllers/StructureController');
		var controller = new Controller();
		controller.start();
	})
	.addRoute(/#question-modal\/(.*)/, function() {
		var Controller = require('./controllers/QuestionController');
		var controller = new Controller();
		controller.start(arguments[0]);
	}).startRouting();
}


