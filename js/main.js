var Router = require('./router');
var UI = require('./utils/UI');
var StructureController = require('./controllers/StructureController');
var QuestionController = require('./controllers/QuestionController');
var SettingsController = require('./controllers/SettingsController');

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
		SettingsController.start();
	})
	.addRoute(/#structure/, function() {
		StructureController.start();
	})
	.addRoute(/#structure\/(.*)\/(.*)?/, function(sectionUuid, questionUuid){
		QuestionController.start(sectionUuid, questionUuid);
	})
	.startRouting();
}


