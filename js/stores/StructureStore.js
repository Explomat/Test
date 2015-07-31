var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var StructureConstants = require('../constants/StructureConstants');
var ServerConstants = require('../constants/ServerConstants');
var extend = require('extend-object');

var _structure = {};

function loadStructureData(data) {
	_structure = data;
}

var StructureStore = extend({}, EventEmitter.prototype, {
	
	getData: function(){
		return _structure;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callBack) {
		this.on('change', callBack);
	},

	removeChangeListener: function(callBack) {
		this.removeListener('change', callBack);
	}
});

StructureStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case ServerConstants.RECEIVE_STRUCTURE_DATA:
			loadStructureData(action.data);
			break;
		default:
			return true;
	}

	StructureStore.emitChange();
	return true;
});

module.exports = StructureStore;
