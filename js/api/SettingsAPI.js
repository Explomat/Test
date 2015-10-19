var Config = require('../config');
var Storage = require('../utils/Storage');
var Settings = require('../models/Settings');

module.exports = {

	getSettingsData: function(){
		var settings = Storage.getItem('settings');
		Storage.setItem('settings', new Settings(settings));
		return Storage.getItem('settings');
	},

	saveSettings: function(settings){
		Storage.setItem('settings', settings);
	}
}