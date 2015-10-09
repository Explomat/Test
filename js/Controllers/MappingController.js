var React = require('react');
var MappingAPI = require('../api/MappingAPI');
var MappingView = require('../components/MappingView');
var MappingActions = require('../actions/MappingActions');
var Config = require('../config');

module.exports = {

	start: function(){
		var app = document.getElementById(Config.dom.appId) || document.body;
		React.unmountComponentAtNode(app);

		var sections = MappingAPI.getSections();
		MappingActions.receiveData(sections);
		React.render(React.createElement(MappingView), app);
	}
}
