var React = require('react');
var ReactDOM = require('react-dom');
var BasicView = require('../components/BasicView');
var Config = require('../config');

module.exports = {
	
	start: function(sectionName){
		/*var appElem = document.getElementById(Config.dom.appId);
		if (appElem) ReactDOM.unmountComponentAtNode(appElem);*/
		
		ReactDOM.unmountComponentAtNode(document.body);
		ReactDOM.render(React.createElement(BasicView/*, {sectionName: sectionName}*/), document.body);
	}
}