var React = require('react');
var MappingView = require('../components/MappingView');
var Config = require('../config');

module.exports = {

	start: function(){
		var app = document.getElementById(Config.dom.appId) || document.body;
		React.unmountComponentAtNode(app);
		React.render(React.createElement(MappingView), app);
	}
}
