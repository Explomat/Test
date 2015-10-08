var Config = require('../config');
var Storage = require('../utils/Storage');
var StructureData = require('../data/StructureData');

module.exports = {

	getStructureData: function() {
		return StructureData.init();
	},

	saveStructure: function(structure){
		StructureData.saveStructure(structure);
	},

	removeQuestion: function(sectionUuid, questionUuid){ 
		StructureData.removeQuestion(sectionUuid, questionUuid);
	},

	replaceQuestionInSection: function(questionUuid, sourceSectionUuid, destQuestionUuid){
		StructureData.replaceQuestionInSection(questionUuid, sourceSectionUuid, destQuestionUuid);
	},

	replaceQuestionInNewSection: function(questionUuid, sourceSectionUuid, destSectionUuid){
		StructureData.replaceQuestionInNewSection(questionUuid, sourceSectionUuid, destSectionUuid);
	},

	shiftUpQuestion: function(questionUuid, sectionUuid){
		StructureData.shiftUpQuestion(questionUuid, sectionUuid);
	},

	shiftDownQuestion: function(questionUuid, sectionUuid){
		StructureData.shiftDownQuestion(questionUuid, sectionUuid);
	},

	saveSection: function(section){
		StructureData.saveSection(section);
	},

	removeSection: function (sectionUuid) {
		StructureData.removeSection(sectionUuid);
	},

	replaceSection: function(sectionUuid, destSectionUuid){
		StructureData.replaceSection(sectionUuid, destSectionUuid);
	},

	shiftUpSection: function(sectionUuid){
		StructureData.shiftUpSection(sectionUuid);
	},

	shiftDownSection: function(sectionUuid){
		StructureData.shiftDownSection(sectionUuid);
	},

	toggleExpandSection: function(sectionUuid){
		StructureData.toggleExpandSection(sectionUuid);
	},

	toggleExpandSections: function(isExpandedSections){
		StructureData.toggleExpandSections(isExpandedSections);
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