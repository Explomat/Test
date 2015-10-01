var Config = require('../config');
var Storage = require('../utils/Storage')

module.exports = {
	getSections: function () {
		var structure = Storage.getItem('structure');
		if (!structure){
			throw new Error('Structure is not defined in storage');
			return;
		}
		return structure.sections || [];
	}
}