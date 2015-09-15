var React = require('react');
var StructureActions = require('../actions/StructureActions');
var StructureAPI = require('../api/StructureAPI');
var StructureView = require('../components/StructureView');
var Config = require('../config');

module.exports = {

	start: function(){
		var structure =  StructureAPI.getStructureData();
		var app = document.getElementById(Config.dom.appId) || document.body;
		React.unmountComponentAtNode(app);
		StructureActions.receiveStructure(structure);
		React.render(React.createElement(StructureView), app);
	}
}
