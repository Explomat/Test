var Config = require('../config');
var SectionData = require('../data/SectionData');

module.exports = {

	createSection: function(){
		return SectionData.createNew();
	},

	getSection: function(sectionUuid){
		return SectionData.getSection(sectionUuid);
	},

	saveSection: function(section) {
		try {
			SectionData.save(section);
		}
		catch(e) { return false; }
		return true;
	}
}