var Config = require('../config');
var Storage = require('../utils/Storage');
var Section = require('../models/Section');

module.exports = {

	createSection: function(){
		return new Section();
	},

	getSection: function(sectionUuid){
		var structure = Storage.getItem('structure');
		if (!structure){
			throw new Error('Structure is not defined in storage');
			return;
		}
		var sections = structure.sections || [];
		for (var i = sections.length - 1; i >= 0; i--) {
			if (sections[i].uuid == sectionUuid)
				return sections[i];
		}
		return null;
	},

	saveSection: function(section) {
		try {
			var structure = Storage.getItem('structure');
			if (!structure){
				throw new Error('Structure is not defined in storage');
				return;
			}
			var sections = structure.sections || [];
			var isEdit = false;
			for (var i = sections.length - 1; i >= 0; i--) {
				if (sections[i].uuid == section.uuid) {
					sections[i] = section;
					isEdit = true;
					break;
				}
			}

			if (!isEdit) {
				structure.sections.push(section);
			}
			Storage.setItem('structure', structure);
		}
		catch(e) { return false; }
		return true;
	}
}