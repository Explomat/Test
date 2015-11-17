var React = require('react');
var ReactDOM = require('react-dom');
var MappingAPI = require('../api/MappingAPI');
var MappingView = require('../components/MappingView');
var MappingActions = require('../actions/MappingActions');
var Config = require('../config');

module.exports = {

	start: function(){
		var app = document.getElementById(Config.dom.appId) || document.body;
		ReactDOM.unmountComponentAtNode(app);

		var data = MappingAPI.getData();
		MappingActions.receiveData(data);
		ReactDOM.render(React.createElement(MappingView), app);
	}
}
