var React = require('react');
var ReactDOM = require('react-dom');
var StructureActions = require('../actions/StructureActions');
var StructureAPI = require('../api/StructureAPI');
var StructureView = require('../components/StructureView');
var Config = require('../config');

module.exports = {

	start: function(isAnimate){
		var structure =  StructureAPI.getStructureData();
		var app = document.getElementById(Config.dom.appId) || document.body;
		var modalApp = document.getElementById(Config.dom.modalId);

		if (modalApp) ReactDOM.unmountComponentAtNode(modalApp);
		
		ReactDOM.unmountComponentAtNode(app);
		StructureActions.receiveStructure(structure);
		ReactDOM.render(React.createElement(StructureView, {isAnimate: isAnimate}), app);
	}
}
