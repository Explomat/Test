var React = require('react');
var StructureActions = require('../actions/StructureActions');
var StructureAPI = require('../api/StructureAPI');
var StructureView = require('../components/StructureView');
var Config = require('../config');

module.exports = {

	start: function(){
		return {
			promise: StructureAPI.getStructureData(),
			promiseCallBack: function(data){
				var app = document.getElementById(Config.dom.appId) || document.body;
				React.unmountComponentAtNode(app);
				StructureActions.receiveStructure(data);
				React.render(React.createElement(StructureView), app);
			}
		}
	}
}
