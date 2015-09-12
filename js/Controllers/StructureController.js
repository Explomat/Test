var React = require('react');
var StructureActions = require('../actions/StructureActions');
var StructureAPI = require('../api/StructureAPI');
var StructureView = require('../components/StructureView');
var Config = require('../Config');

module.exports = {

	start: function(){
		var app = document.getElementById(Config.dom.appId) || document.body;
		React.unmountComponentAtNode(app);

		StructureAPI.getStructureData().then(function(data){
			StructureActions.receiveStructure(data);
			React.render(React.createElement(StructureView), app);
		});
	}
}
