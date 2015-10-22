var React = require('react');
var ReactDOM = require('react-dom');
var SettingsView = require('../components/SettingsView');
var SettingsAPI = require('../api/SettingsAPI');
var SettingsActions = require('../actions/SettingsActions');
var Config = require('../config');

module.exports = {

	start: function(){
		var app = document.getElementById(Config.dom.appId) || document.body;
		ReactDOM.unmountComponentAtNode(app);

		var settings = SettingsAPI.getSettingsData();
		SettingsActions.receiveSettings(settings);
		ReactDOM.render(React.createElement(SettingsView), app);
	}
}
