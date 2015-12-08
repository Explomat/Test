var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var StructureConstants = require('../constants/StructureConstants');
var QuestionConstants = require('../constants/QuestionConstants');
var QuestionTypes = require('../utils/QuestionTypes');
var extend = require('extend');
var array = require('../utils/Array');
var StructureAPI = require('../api/StructureAPI');

var _structure = {}, _sections = [];

function _getMaxAnswerWeight(question){
	var answers = question.answers;
	var weight = answers[0].weight;
	for (var i = answers.length - 1; i >= 0; i--) {
		if (Number(answers[i].weight) > weight && answers[i].selected) {
			weight = Number(answers[i].weight);
		}
	};
	return weight;
}

function _getMultipleResponseWeight(question){
	var correctAnswersWeight = 0;
	var inCorrectAnswersWeight = 0;
	for (var i = question.answers.length - 1; i >= 0; i--) {
		var ans = question.answers[i];
		if (ans.selected) correctAnswersWeight += Number(ans.weight);
		else inCorrectAnswersWeight += Number(ans.weight);
	};
	return correctAnswersWeight - inCorrectAnswersWeight;
}

function _getSummAnswersWeight(question){
	var weight = 0;
	var answers = question.answers;
	for (var i = answers.length - 1; i >= 0; i--) {
		weight += Number(answers[i].weight);
	};
	return weight === 0 ? 1 : weight;
	return 1;
}

function getQuestion(questionUuid){
	for (var i = _sections.length - 1; i >= 0; i--) {
		section = _sections[i];
		var questions = section.questions;
		for (var j = questions.length - 1; j >= 0; j--) {
			if (questions[j].uuid === questionUuid) {
				return { question: questions[j], index: j }
			}
		}
	}
	return null;
}

function getSection(sectionUuid){
	for (var i = _sections.length - 1; i >= 0; i--) {
		if(_sections[i].uuid === sectionUuid) {
			return { section:_sections[i], index: i}
		}
	}
	return null;
}

function getSectionFromIndex(index){
	for (var i = _sections.length - 1; i >= 0; i--) {
		if(i === index) {
			return _sections[i];
		}
	}
	return null;
}

function loadStructureData(data) {
	_structure = data;
	_sections = data.sections || [];
}

function saveStructureData(){
	_structure = _sections = null;
}

function saveSection(section){
	var isEdit = false;
	for (var i = _sections.length - 1; i >= 0; i--) {
		_sections[i].selected = false;
		if (_sections[i].uuid === section.uuid) {
			_sections[i] = section;
			isEdit = true;
		}
	}
	if (!isEdit) {
		section.selected = true;
		_sections.push(section);
	}
}

function saveQuestion(question, sectionUuid){
	var questionIndex = getQuestion(question.uuid);
	var section = getSection(sectionUuid);

	if (questionIndex === null && section) {
		section.section.questions.push(question);
	}
	else if (questionIndex !== null && section){
		section.section.questions[questionIndex.index] = question;
	}
}

function removeQuestion(sectionUuid, questionUuid){
	var questionIndex = getQuestion(questionUuid);
	var section = getSection(sectionUuid);

	if (questionIndex !== null && section) {
		section.section.questions.splice(questionIndex.index, 1);
	}
}

function replaceQuestionInSection(sourceQuestionUuid, sourceSectionUuid, destQuestionUuid){
	var sourceSection = getSection(sourceSectionUuid);
	var sourceQuestion = getQuestion(sourceQuestionUuid);
	var destQuestion = getQuestion(destQuestionUuid);

	if (sourceSection && destQuestion) {
		sourceSection.section.questions.splice(sourceQuestion.index, 1);
		sourceSection.section.questions.splice(destQuestion.index, 0, sourceQuestion.question);
	}
}

function replaceQuestionInNewSection(sourceQuestionUuid, sourceSectionUuid, destSectionUuid){
	var sourceSection = getSection(sourceSectionUuid);
	var destSection = getSection(destSectionUuid);
	var sourceQuestion = getQuestion(sourceQuestionUuid);
	
	if (sourceSection && destSection){
		sourceSection.section.questions.splice(sourceQuestion.index, 1);
		destSection.section.questions.push(sourceQuestion.question);
	}
}


function removeSection(uuid){
	var secIndex = _sections.findIndex(function(sec){
		return sec.uuid === uuid;
	});
	if (secIndex !== -1){
		var section = _sections.splice(secIndex, 1)[0];
		if (section.selected) {
			secIndex = secIndex === _sections.length ? secIndex - 1 : secIndex;
			var selectedSection = getSectionFromIndex(secIndex); 
			if (selectedSection) {
				selectedSection.selected = true;
			}
		}
	}
}

function replaceSection(sectionUuid, destSectionUuid){
	var sourceSection = getSection(sectionUuid);
	var destSection = getSection(destSectionUuid);

	if (sourceSection && destSection){
		_sections.splice(sourceSection.index, 1);
		_sections.splice(destSection.index, 0, sourceSection.section);
	}
}

function toggleSelectSection(sectionUuid){
	for (var i = _sections.length - 1; i >= 0; i--) {
		_sections[i].selected = false;
		if (_sections[i].uuid === sectionUuid) _sections[i].selected = true;
	};
}

var StructureStore = extend({}, EventEmitter.prototype, {
	
	getSections: function(){
		return _sections;
	},

	getSectionsCount: function(){
		return _sections.length;
	},

	getStructure: function () {
		return _structure;
	},

	/*getQuestionWeightOld: function(questionUuid){
		for (var i = _sections.length - 1; i >= 0; i--) {
			var section = _sections[i];
			var questions = section.questions;
			for (var j = questions.length - 1; j >= 0; j--) {
				if (questions[j].uuid !== questionUuid) continue;
				if (!questions[j].useSelfWeight) return questions[j].weight;
				return -1;
			}
		}
		return -1;
	},

	getSummAnswersWeight: function(questionUuid){
		for (var i = _sections.length - 1; i >= 0; i--) {
			var section = _sections[i];
			var questions = section.questions;
			for (var j = questions.length - 1; j >= 0; j--) {
				if (questions[j].uuid !== questionUuid) continue;
				var weight = 0;
				var answers = questions[j].answers;
				for (var k = answers.length - 1; k >= 0; k--) {
					weight += Number(answers[k].weight);
				};
				return weight === 0 ? 1 : weight;
			}
		}
		return 1;
	},*/

	getQuestionWeight: function(questionUuid) {
		for (var i = _sections.length - 1; i >= 0; i--) {
			var section = _sections[i];
			var questions = section.questions;
			for (var j = questions.length - 1; j >= 0; j--) {
				if (questions[j].uuid !== questionUuid) continue;
				
				var question = questions[j];
				if (!question.useSelfWeight) return question.weight;

				if (question.type === QuestionTypes.keys.multiple_response){
					return _getMultipleResponseWeight(question);
				}
				else if (question.type === QuestionTypes.keys.order || question.type === QuestionTypes.keys.gap_fill){
					return _getSummAnswersWeight(question);
				}
				else {
					return _getMaxAnswerWeight(question);
				}
			}
		}
	},

	getQuestionIndexNoSection: function(questionUuid){
		var index = 0;
		for (var i = _sections.length - 1; i >= 0; i--) {
			var section = _sections[i];
			var questions = section.questions;
			for (var j = questions.length - 1; j >= 0; j--) {
				index++;
				if (questions[j].uuid === questionUuid) {
					return index;
				}
			}
		}
		return null;
	},

	getQuestionIndex: function (questionUuid) {
		var question = getQuestion(questionUuid);
		return question ? question.index : null;
	},

	getSectionIndex: function(sectionUuid){
		var section = getSection(sectionUuid);
		return section ? section.index : null;
	},

	getSectionSelected: function() {
		for (var i = _sections.length - 1; i >= 0; i--) {
			if(_sections[i].selected === true) return _sections[i];
		};
		return null;
	},

	isSectionSelected: function(sectionUuid){
		for (var i = _sections.length - 1; i >= 0; i--) {
			if(_sections[i].uuid === sectionUuid && _sections[i].selected === true) return true;
		};
		return false;
	},

	getQuestionsCountInSection: function(sectionUuid){
		var section = getSection(sectionUuid);
		return section ? section.section.questions.length : null;
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
			saveStructureData();
			break;
		case StructureConstants.SAVE_SECTION:
			saveSection(action.section);
			isEmit = true;
			break;
		case StructureConstants.REPLACE_SECTION:
			replaceSection(action.sectionUuid, action.destSectionUuid);
			isEmit =  true;
			break;
		case StructureConstants.REMOVE_SECTION:
			removeSection(action.uuid);
			isEmit = true;
			break;
		case StructureConstants.SHIFT_UP_SECTION:
			shiftUpSection(action.sectionUuid);
			isEmit = true;
			break;
		case StructureConstants.SHIFT_DOWN_SECTION:
			shiftDownSection(action.sectionUuid);
			isEmit = true;
			break;
		case StructureConstants.TOGGLE_SELECT_SECTION:
			toggleSelectSection(action.sectionUuid);
			isEmit = true;
			break;
		case StructureConstants.REMOVE_QUESTION:
			removeQuestion(action.sectionUuid, action.questionUuid);
			isEmit = true;
			break;
		case StructureConstants.REPLACE_QUESTION_IN_SECTION:
			replaceQuestionInSection(action.questionUuid, action.sourceSectionUuid, action.destQuestionUuid);
			isEmit = true;
			break;
		case StructureConstants.REPLACE_QUESTION_IN_NEW_SECTION:
			replaceQuestionInNewSection(action.questionUuid, action.sourceSectionUuid, action.destSectionUuid);
			isEmit = true;
			break;
		case StructureConstants.SHIFT_UP_QUESTION:
			shiftUpQuestion(action.questionUuid, action.sectionUuid);
			isEmit = true;
			break;
		case StructureConstants.SHIFT_DOWN_QUESTION:
			shiftDownQuestion(action.questionUuid, action.sectionUuid);
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
		StructureAPI.saveStructure(_structure);
		StructureStore.emitChange();
	}
	return true;
});

module.exports = StructureStore;
