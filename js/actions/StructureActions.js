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
		AppDispatcher.handleData({
			actionType: StructureConstants.REMOVE_QUESTION,
			sectionUuid: sectionUuid,
			questionUuid: questionUuid
		});
	},

	
	replaceQuestionInSection: function(questionUuid, sourceSectionUuid, destQuestionUuid){
		AppDispatcher.handleData({
			actionType: StructureConstants.REPLACE_QUESTION_IN_SECTION,
			questionUuid: questionUuid,
			sourceSectionUuid: sourceSectionUuid,
			destQuestionUuid: destQuestionUuid
		});
	},

	replaceQuestionInNewSection: function(questionUuid, sourceSectionUuid, destSectionUuid){
		AppDispatcher.handleData({
			actionType: StructureConstants.REPLACE_QUESTION_IN_NEW_SECTION,
			questionUuid: questionUuid,
			sourceSectionUuid: sourceSectionUuid,
			destSectionUuid: destSectionUuid
		});
	},


	shiftUpQuestion: function(questionUuid, sectionUuid){
		AppDispatcher.handleData({
			actionType: StructureConstants.SHIFT_UP_QUESTION,
			questionUuid: questionUuid,
			sectionUuid: sectionUuid
		});
	},

	shiftDownQuestion: function(questionUuid, sectionUuid){
		AppDispatcher.handleData({
			actionType: StructureConstants.SHIFT_DOWN_QUESTION,
			questionUuid: questionUuid,
			sectionUuid: sectionUuid
		});
	},

	saveSection: function(section){
		AppDispatcher.handleData({
			actionType: StructureConstants.SAVE_SECTION,
			section: section
		});
	},

	removeSection: function(uuid){
		AppDispatcher.handleData({
			actionType: StructureConstants.REMOVE_SECTION,
			uuid: uuid
		});
	},

	replaceSection: function(sectionUuid, destSectionUuid){
		AppDispatcher.handleData({
			actionType: StructureConstants.REPLACE_SECTION,
			sectionUuid: sectionUuid,
			destSectionUuid: destSectionUuid
		});
	},

	shiftUpSection: function(sectionUuid){
		AppDispatcher.handleData({
			actionType: StructureConstants.SHIFT_UP_SECTION,
			sectionUuid: sectionUuid
		});
	},

	shiftDownSection: function(sectionUuid){
		AppDispatcher.handleData({
			actionType: StructureConstants.SHIFT_DOWN_SECTION,
			sectionUuid: sectionUuid
		});
	},

	toggleExpandSection: function(sectionUuid){
		AppDispatcher.handleData({
			actionType: StructureConstants.TOGGLE_EXPAND_SECTION,
			sectionUuid: sectionUuid
		});
	}
}

module.exports = StructureActions;