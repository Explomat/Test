var Config = require('../config');
var Storage = require('../utils/Storage')

module.exports = {
	getData: function () {
		var structure = Storage.getItem('structure');
		var settings = Storage.getItem('settings');
		
		if (!structure || !settings){
			throw new Error('Tests data is not defined in storage');
			return;
		}
		return {
			structure: structure,
			settings: settings
		}
	}
}