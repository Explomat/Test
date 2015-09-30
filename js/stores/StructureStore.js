var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var StructureConstants = require('../constants/StructureConstants');
var QuestionConstants = require('../constants/QuestionConstants');
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

function saveStructureDate(){
	_structure = _sections = null;
}

function saveSection(section){
	var isEdit = false;
	for (var i = _sections.length - 1; i >= 0; i--) {
		if (_sections[i].uuid == section.uuid) {
			_sections[i] = section;
			isEdit = true;
			break;
		}
	}
	if (!isEdit)
		_sections.push(section);
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
	var isEmit = false;

	switch(action.actionType) {

		case StructureConstants.RECEIVE_STRUCTURE_DATA:
			loadStructureData(action.data);
			isEmit = true;
			break;
		case StructureConstants.SAVE_STRUCTURE_DATA:
			saveStructureDate();
			break;
		case StructureConstants.SAVE_SECTION:
			saveSection(action.section);
			isEmit = true;
			break;
		case StructureConstants.REMOVE_SECTION:
			removeSection(action.uuid);
			isEmit = true;
			break;
		case StructureConstants.REMOVE_QUESTION:
			removeQuestion(action.sectionUuid, action.questionUuid);
			isEmit = true;
			break;
		case QuestionConstants.SAVE_QUESTION_DATA:
			saveQuestion(action.question, action.sectionUuid);
			isEmit = true;
			break;
		default:
			return true;
	}

	if (isEmit){
		StructureStore.emitChange();
	}
	return true;
});

module.exports = StructureStore;
