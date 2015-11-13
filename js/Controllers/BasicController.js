var React = require('react');
var ReactDOM = require('react-dom');
var BasicView = require('../components/BasicView');
var Config = require('../config');

module.exports = {
	
	start: function(sectionName){
		var appElem = document.getElementById(Config.dom.basicAppId) || document.body;
		
		ReactDOM.unmountComponentAtNode(appElem);
		ReactDOM.render(React.createElement(BasicView/*, {sectionName: sectionName}*/), appElem);
	}
}