var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var StructureConstants = require('../constants/StructureConstants');
var Section = require('../models/Section')
var ServerConstants = require('../constants/ServerConstants');
var extend = require('extend-object');

var _structure = {}, _sections = [];

function getQuestionIndex(questionUuid){
	for (var i = _sections.length - 1; i >= 0; i--) {
		section = _sections[i];
		var questions = section.questions;
		for (var j = questions.length - 1; j >= 0; j--) {
			if (questions[j].uuid == questionUuid) {
				return j;
			}
		}
	}
	return null;
}

function getSection(sectionUuid){
	for (var i = _sections.length - 1; i >= 0; i--) {
		if(_sections[i].uuid == sectionUuid) {
			return _sections[i];
		}
	}
	return null;
}

function loadStructureData(data) {
	_structure = data;
	_sections = data.sections || [];
}

function addNewSection(){
	_sections.push(new Section());
}

function saveQuestion(question, sectionUuid){
	var questionIndex = getQuestionIndex(question.uuid);
	var section = getSection(sectionUuid);

	if (questionIndex === null && section) {
		section.questions.push(question);
	}
	else if (questionIndex !== null && section){
		section.questions[questionIndex] = question;
	}
}

function removeQuestion(sectionUuid, questionUuid){
	var questionIndex = getQuestionIndex(questionUuid);
	var section = getSection(sectionUuid);

	if (questionIndex !== null && section) {
		section.questions.splice(questionIndex, 1);
	}
}

function removeSection(uuid){
	var secIndex = _sections.findIndex(function(sec){
		return sec.uuid == uuid;
	});
	if (secIndex != -1)
		_sections.splice(secIndex, 1);
}

var StructureStore = extend({}, EventEmitter.prototype, {
	
	getSections: function(){
		return _sections;
	},

	getStructure: function () {
		return _structure;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callBack) {
		this.on('change', callBack);
	},

	removeChangeListener: function(callBack) {
		this.removeListener('change', callBack);
	}
});

StructureStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case ServerConstants.RECEIVE_STRUCTURE_DATA:
			loadStructureData(action.data);
			break;
		case StructureConstants.ADD_SECTION:
			addNewSection();
			break;
		case StructureConstants.REMOVE_SECTION:
			removeSection(action.uuid);
			break;
		case StructureConstants.REMOVE_QUESTION:
			removeQuestion(action.sectionUuid, action.questionUuid);
			break;
		case ServerConstants.SAVE_QUESTION_DATA:
			saveQuestion(action.question, action.sectionUuid);
			break;
		default:
			return true;
	}

	StructureStore.emitChange();
	return true;
});

module.exports = StructureStore;
