var React = require('react');
var StructureActions = require('../actions/StructureActions');
var StructureAPI = require('../api/StructureAPI');
var StructureView = require('../components/StructureView');

function StructureController() {
	var app = document.getElementById('app');
	React.unmountComponentAtNode(app);

	this.start = function() {
		StructureAPI.getStructureData().then(function(data){
			StructureActions.receiveStructure(data);
			React.render(React.createElement(StructureView), app);
		});
	}
}

module.exports = new StructureController();
