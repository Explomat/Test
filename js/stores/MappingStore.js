var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MappingConstants = require('../constants/MappingConstants');
var extend = require('extend-object');

var _data = {};

function loadMappingData(data){
	_data = data;
}

var MappingStore = extend({}, EventEmitter.prototype, {
	
	getData: function(){
		return _data;
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

MappingStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case MappingConstants.RECEIVE_MAPPING_DATA:
			loadMappingData(action.data);
			break;
		default:
			return true;
	}

	MappingStore.emitChange();
	return true;
});

module.exports = MappingStore;
