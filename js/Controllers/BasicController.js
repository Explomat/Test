var React = require('react');
var ReactDOM = require('react-dom');
var BasicView = require('../components/BasicView');
var BasicAPI = require('../api/BasicAPI');
var Config = require('../config');

module.exports = {
	
	start: function(){
		var appElem = document.getElementById(Config.dom.basicAppId) || document.body;
		BasicAPI.loadData();
		
		ReactDOM.unmountComponentAtNode(appElem);
		ReactDOM.render(React.createElement(BasicView), appElem);
	}
}