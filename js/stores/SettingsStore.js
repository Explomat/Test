var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SettingsConstants = require('../constants/SettingsConstants');
var extend = require('extend-object');

var _settings = {};

function loadSettingsData(data) {
	_settings = data;
}

var SettingsStore = extend({}, EventEmitter.prototype, {
	
	getSettings: function(){
		return _settings;
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

SettingsStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case SettingsConstants.RECEIVE_SETTINGS_DATA:
			loadSettingsData(action.data);
			break;
		default:
			return true;
	}

	SettingsStore.emitChange();
	return true;
});

module.exports = SettingsStore;
