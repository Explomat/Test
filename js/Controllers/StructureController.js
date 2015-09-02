var React = require('react');
var StructureActions = require('../actions/StructureActions');
var StructureAPI = require('../api/StructureAPI');
var StructureView = require('../components/StructureView');

function StructureController() {
	var app = document.getElementById('app');
	React.unmountComponentAtNode(app);

	this.start = function() {
		try {
			StructureAPI.getStructureData().then(function(data){
				StructureActions.receiveStructure(data);
				React.render(React.createElement(StructureView), app);
			});
		}
		catch(e){
			console.log(e);
		}
		
	}
}

module.exports = StructureController;
