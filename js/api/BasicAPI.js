var Config = require('../config');
var Storage = require('../utils/Storage');
var Settings = require('../models/Settings');
var Structure = require('../models/Structure');

module.exports = {

	loadData: function() {
		var structure = Storage.getItem('structure');
		var settings = Storage.getItem('settings');
		if (!structure) Storage.setItem('structure', new Structure(structure));
		if (!settings) Storage.setItem('settings', new Settings(settings));
	}
}