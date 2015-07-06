var Dispatcher = require('flux').Dispatcher;

var AppDispacher = new Dispatcher();

AppDispacher.handleAction = function (action) {
	this.dispatch({
		source: 'VIEW_ACTION',
		action: action
	});
}

AppDispacher.handleData = function (action) {
	this.dispatch({
		source: 'VIEW_ACTION',
		action: action
	});
}

module.exports = AppDispacher;