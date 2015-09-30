var React = require('react');
var SettingsView = require('../components/SettingsView');
var Config = require('../config');

module.exports = {

	start: function(){
		var app = document.getElementById(Config.dom.appId) || document.body;
		React.unmountComponentAtNode(app);
		React.render(React.createElement(SettingsView), app);
	}
}
