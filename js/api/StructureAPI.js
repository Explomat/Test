var Config = require('../config');
var Storage = require('../utils/Storage');
var StructureData = require('../data/StructureData');

module.exports = {

	getStructureData: function() {
		return StructureData.init();
	},

	saveStructure: function(structure){
		Storage.setItem('structure', structure);
	},

	isSectionExist: function(sectionId){
		var structure = Storage.getItem('structure') || {};
		if (!structure.sections) return false;
		for (var i = structure.sections.length - 1; i >= 0; i--) {
			if (structure.sections[i].uuid == sectionId) return true;
		};
		return false;
	}
}