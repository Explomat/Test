var AppDispatcher = require('../dispatcher/AppDispatcher');
var StructureConstants = require('../constants/StructureConstants');
var StructureAPI = require('../api/StructureAPI');

var StructureActions = {

	receiveStructure: function(data) {
		AppDispatcher.handleData({
			actionType: StructureConstants.RECEIVE_STRUCTURE_DATA,
			data: data
		});
	},

	saveStructure: function(structure){
		StructureAPI.saveStructure(structure);
		AppDispatcher.handleData({
			actionType: StructureConstants.SAVE_STRUCTURE_DATA
		});
	},

	removeQuestion: function(sectionUuid, questionUuid){
		StructureAPI.removeQuestion(sectionUuid, questionUuid);
		AppDispatcher.handleData({
			actionType: StructureConstants.REMOVE_QUESTION,
			sectionUuid: sectionUuid,
			questionUuid: questionUuid
		});
	},

	
	replaceQuestionInSection: function(questionUuid, sourceSectionUuid, destQuestionUuid){
		StructureAPI.replaceQuestionInSection(questionUuid, sourceSectionUuid, destQuestionUuid);
		AppDispatcher.handleData({
			actionType: StructureConstants.REPLACE_QUESTION_IN_SECTION,
			questionUuid: questionUuid,
			sourceSectionUuid: sourceSectionUuid,
			destQuestionUuid: destQuestionUuid
		});
	},

	replaceQuestionInNewSection: function(questionUuid, sourceSectionUuid, destSectionUuid){
		StructureAPI.replaceQuestionInNewSection(questionUuid, sourceSectionUuid, destSectionUuid);
		AppDispatcher.handleData({
			actionType: StructureConstants.REPLACE_QUESTION_IN_NEW_SECTION,
			questionUuid: questionUuid,
			sourceSectionUuid: sourceSectionUuid,
			destSectionUuid: destSectionUuid
		});
	},

	saveSection: function(section){
		StructureAPI.saveSection(section);
		AppDispatcher.handleData({
			actionType: StructureConstants.SAVE_SECTION,
			section: section
		});
	},

	removeSection: function(uuid){
		StructureAPI.removeSection(uuid);
		AppDispatcher.handleData({
			actionType: StructureConstants.REMOVE_SECTION,
			uuid: uuid
		});
	},

	replaceSection: function(sectionUuid, destSectionUuid){
		//StructureAPI.replaceSection(sectionUuid, destSectionUuid);
		AppDispatcher.handleData({
			actionType: StructureConstants.REPLACE_SECTION,
			sectionUuid: sectionUuid,
			destSectionUuid: destSectionUuid
		});
	}
}

module.exports = StructureActions;