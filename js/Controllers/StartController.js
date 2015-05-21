
function StartController() {
	var React = require('React');
	var app = document.getElementById('app');
	React.unmountComponentAtNode(app);

	this.start = function() {
		React.render(React.createElement('div'), app);
	}
}

module.exports = new StartController();
