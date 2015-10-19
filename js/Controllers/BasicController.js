var React = require('react');
var BasicView = require('../components/BasicView');

module.exports = {
	
	start: function(){
		React.unmountComponentAtNode(document.body);
		React.render(React.createElement(BasicView), document.body);
	}
}