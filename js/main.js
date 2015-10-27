var Router = require('./utils/Crossroads');
var Hasher = require('./utils/Hasher');
var Config = require('./config');
var UI = require('./utils/UI');
var BasicController = require('./controllers/BasicController');
var StructureController = require('./controllers/StructureController');
var MappingController = require('./controllers/MappingController');
var QuestionController = require('./controllers/modal/QuestionController');
var SettingsController = require('./controllers/SettingsController');
var SectionController = require('./controllers/modal/SectionController');

window.onload = function(){

	Router.addRoute(Config.hashes.settings.key, function(){
		//BasicController.start(Config.hashes.settings.value);
	    SettingsController.start();
	});
	Router.addRoute(Config.hashes.structure.key, function(id){
		//BasicController.start(Config.hashes.structure.value);
	    StructureController.start(true);
	});
	Router.addRoute(Config.hashes.section.key, function(sectionId){
		//BasicController.start(Config.hashes.section.value);
		StructureController.start(false);
	    SectionController.start(sectionId);
	});
	Router.addRoute(Config.hashes.question.key, function(sectionId, questionId){
		//BasicController.start(Config.hashes.question.value);
		StructureController.start(false);
	    QuestionController.start(sectionId, questionId);
	});
	Router.addRoute(Config.hashes.view.key, function(){
		//BasicController.start(Config.hashes.view.value);
	    MappingController.start();
	});

	function changeTabClass(curHash){

		function getHashRoot(hash){
			var isChainHash = hash.indexOf('/');
			return isChainHash === -1 ? hash : hash.substring(0, isChainHash);
		}

		var menuBox = document.getElementsByClassName('menu-box')[0];
		var tabBorder = document.getElementsByClassName('menu-box__item_border')[0];
		var curElem = UI.getElementByHash(menuBox, getHashRoot(curHash));
		UI.transitionBorder(menuBox, tabBorder, curElem.parentNode);
	}

	function init(curHash){
		curHash = curHash === '' ? Config.hashes.DEFAULT_HASH_KEY : curHash;
		
		BasicController.start();
		Hasher.setHash(curHash);
		changeTabClass('#' + curHash);
		Router.parse(curHash);
	}

	//setup hasher
	function parseHash(newHash){
		changeTabClass('#' + newHash);
		Router.parse(newHash);
	}

	Hasher.changed.add(parseHash); //parse hash changes
	Hasher.initialized.add(init); //parse initial hash
	
	Hasher.prependHash = '';
	Hasher.init(); //start listening for history change
}


