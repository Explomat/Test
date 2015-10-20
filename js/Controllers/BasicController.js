var React = require('react');
var BasicView = require('../components/BasicView');
var Config = require('../config');

module.exports = {
	
	start: function(sectionName){
		var appElem = document.getElementById(Config.dom.appId);
		if (appElem) React.unmountComponentAtNode(appElem);
		
		React.unmountComponentAtNode(document.body);
		React.render(React.createElement(BasicView, {sectionName: sectionName}), document.body);
	}
}