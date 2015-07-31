var Config = require('../config');
var Ajax = require('../utils/Ajax');

module.exports = {

	getStructureData: function() {
		return Ajax.getStructureData();
	}
}