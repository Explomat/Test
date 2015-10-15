var React = require('react');
var SettingsView = require('../components/SettingsView');
var SettingsAPI = require('../api/SettingsAPI');
var SettingsActions = require('../actions/SettingsActions');
var Config = require('../config');

module.exports = {

	start: function(){
		var app = document.getElementById(Config.dom.appId) || document.body;
		React.unmountComponentAtNode(app);

		var settings = SettingsAPI.getSettingsData();
		SettingsActions.receiveSettings(settings);
		React.render(React.createElement(SettingsView), app);
	}
}
