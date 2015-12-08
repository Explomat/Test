var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MappingConstants = require('../constants/MappingConstants');
var QuestionTypes = require('../utils/QuestionTypes');
var extend = require('extend');

var _data = {};

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

function loadMappingData(data){
	_data = data;
}

var MappingStore = extend({}, EventEmitter.prototype, {
	
	getData: function(){
		return _data;
	},

	getQuestionWeight: function(questionUuid) {
		var sections = _data.structure.sections;
		for (var i = sections.length - 1; i >= 0; i--) {
			var section = sections[i];
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

	/*getQuestionWeight: function(questionUuid){
		var sections = _data.structure.sections;
		for (var i = sections.length - 1; i >= 0; i--) {
			var section = sections[i];
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
		var sections = _data.structure.sections;
		for (var i = sections.length - 1; i >= 0; i--) {
			var section = sections[i];
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

	getQuestionsCount: function(){
		var count = 0;
		for (var i = _data.structure.sections.length - 1; i >= 0; i--) {
			count += _data.structure.sections[i].questions.length;
		};
		return count;
	},

	getMaxPassingScore: function(){
		var count = 0;
		for (var i = _data.structure.sections.length - 1; i >= 0; i--) {
			var section = _data.structure.sections[i];
			for (var j = section.questions.length - 1; j >= 0; j--) {
				var question = section.questions[j];
				for (var k = question.answers.length - 1; k >= 0; k--) {
					count += Number(question.answers[k].weight);
				};
			};
		};
		return count;
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

MappingStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case MappingConstants.RECEIVE_MAPPING_DATA:
			loadMappingData(action.data);
			break;
		default:
			return true;
	}

	MappingStore.emitChange();
	return true;
});

module.exports = MappingStore;
