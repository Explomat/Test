var Router = require('./Router');
var UI = require('./utils/UI');
var structureController = require('./controllers/StructureController');
var questionController = require('./controllers/QuestionController');

window.onload = function(){

	/*Router.addRoute('structure', function(id){
	    structureController.start();
	});
	Router.addRoute('structure/{id}', function(id){
	    questionController.start(id);
	});

	//setup hasher
	function parseHash(newHash, oldHash){
	  Router.parse(newHash);
	}
	Hasher.initialized.add(parseHash); //parse initial hash
	Hasher.changed.add(parseHash); //parse hash changes
	Hasher.init(); //start listening for history change
	 
	//update URL fragment generating new history record
	Hasher.setHash('structure');*/

	Router.config({ defaultRoute: '#settings', interval: 100, callBack: function(){
		  var curElem = UI.getElementByHash('app-container', window.location.hash);
		  if (curElem)
		    UI.toggleList(curElem, 'active');
		}
	});

	Router.addRoute(/^#settings$/, function() {
		console.log(arguments);
	})
	.addRoute(/#structure/, function() {
		structureController.start();
	})
	.addRoute(/#structure\/(.*)/, function(){
		questionController.start(arguments[0]);
	})
	.startRouting();
}


