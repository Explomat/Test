var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AnswerConstants = require('../constants/AnswerConstants');
var ServerConstants = require('../constants/ServerConstants');
var UUID = require('../utils/UUID');
var Answer = require('../models/Answer');
var Condition = require('../models/Condition');
var ConditionText = require('../models/ConditionText');

var QuestionTypes = require('../utils/QuestionTypes');
var SubAnswer = require('../utils/SubAnswer');
var extend = require('extend');

var _answers = [], _questionType = '';

function getAnswerWithIndex(uuid){
	for (var i = _answers.length - 1; i >= 0; i--) {
		if (_answers[i].uuid === uuid) {
			return { answer: _answers[i], index: i };
		}
	};
	return null;
}

function addAnswer(){
	_answers.forEach(function(ans){
		ans.expanded = false
	})
	_answers.push(new Answer({expanded: true}));
}

function removeAnswer(uuid) {
	var ansIndex = _answers.findIndex(function(ans){
		return ans.uuid == uuid;
	});
	if (ansIndex != -1 && _answers.length > 1)
		_answers.splice(ansIndex, 1);
}

function shiftUp(uuid) {
	var sourceAnswer = getAnswerWithIndex(uuid);
	if (sourceAnswer && sourceAnswer.index === 0) return;

	var destAnswer = _answers[sourceAnswer.index - 1];
	_answers.splice(sourceAnswer.index, 1);
	_answers.splice(sourceAnswer.index - 1, 0, sourceAnswer.answer);
}

function shiftDown(uuid) {
	var sourceAnswer = getAnswerWithIndex(uuid);
	if (sourceAnswer && sourceAnswer.index === _answers.length - 1) return;

	var destAnswer = _answers[sourceAnswer.index + 1];
	_answers.splice(sourceAnswer.index, 1);
	_answers.splice(sourceAnswer.index + 1, 0, sourceAnswer.answer);
}

function changeAnswerCondition(uuid, text, condition){
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.condition.text = text || ans.condition.text;
		ans.condition.condition = condition || ans.condition.condition;
	}
}

function changeAnswerConditionText(uuid, text, condition){
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.conditionsText.text = text || ans.conditionsText.text;
		ans.conditionsText.condition = condition || ans.conditionsText.condition;
	}
}

function changeAnswerConformity(uuid, conformity) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.conformity = conformity;
	}
}

function uploadedAnswerImg(uuid, img) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.img = img;
	}
}

function errorAnswerImg(uuid, err) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.img = ans.img || {};
		ans.img.error = err;
		ans.img.name = null;
		ans.img.id = null;
	}
}

function removeAnswerImg(uuid){
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.img = null;
	}
}

function selectAnswer(uuid, selected){
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		if (_questionType == QuestionTypes.keys.multiple_choice){
			_answers.forEach(function(item){
				item.selected = false;
			});		
		}
		ans.selected = selected || false;
	}
}

function changeAnswerText(uuid, text) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans)
		ans.text = text;
}

function changeAnswerWeight(uuid, weight) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans)
		ans.weight = weight;
}

function toogleExpand(uuid, isExpanded){
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans) {
		ans.expanded = isExpanded;
	}
}


var AnswersStore = extend({}, EventEmitter.prototype, {

	getAnswers: function() {
		return _answers;
	},

	setAnswers: function(answers){
		_answers = answers;
	},

	setQuestionType: function(qType){
		_questionType = qType;
	},

	resetSelected: function() {
		_answers.forEach(function(item){
			item.selected = false;
		});
	},

	getAnswersCount: function() {
		return _answers.length;
	},

	getAnswerIndex: function(uuid){
		var ans = getAnswerWithIndex(uuid);
		return ans ? ans.index : null;
	},

	getAnswerImg: function(uuid) {
		var ans = _answers.find(function(item){
			return item.uuid == uuid;
		});
		if (ans)
			return ans.img;
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

AnswersStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case AnswerConstants.ANSWER_ADD:
			addAnswer();
			break;
		case AnswerConstants.ANSWER_REMOVE:
			removeAnswer(action.uuid);
			break;

		case AnswerConstants.ANSWER_SHIFT_UP:
			shiftUp(action.uuid);
			break;
		case AnswerConstants.ANSWER_SHIFT_DOWN:
			shiftDown(action.uuid);
			break;

		case AnswerConstants.ANSWER_CHANGE_CONDITION:
			changeAnswerCondition(action.uuid, action.text, action.type);
			break;

		case AnswerConstants.ANSWER_CHANGE_CONDITIONTEXT:
			changeAnswerConditionText(action.uuid, action.text, action.type);
			break;

		case AnswerConstants.ANSWER_CHANGE_CONFORMITY:
			changeAnswerConformity(action.uuid, action.text);
			break;
		case AnswerConstants.ANSWER_SELECTED:
			selectAnswer(action.uuid, action.selected);
			break;
		case AnswerConstants.ANSWER_CHANGE_TEXT:
			changeAnswerText(action.uuid, action.text);
			break;
		case AnswerConstants.ANSWER_CHANGE_WEIGHT:
			changeAnswerWeight(action.uuid, action.weight);
			break;

		case ServerConstants.UPLOADED_ANSWER_IMAGE:
			uploadedAnswerImg(action.uuid, action.img);
			break;
		case ServerConstants.UPLOADED_ANSWER_ERROR_IMAGE:
			errorAnswerImg(action.uuid, action.err);
			break;
		case ServerConstants.REMOVE_ANSWER_IMAGE:
			removeAnswerImg(action.uuid);
			break;
		case ServerConstants.REMOVE_ANSWER_ERROR_IMAGE:
			errorAnswerImg(action.uuid, action.err);
			break;

		case AnswerConstants.ANSWER_TOOGLE_EXPAND:
			toogleExpand(action.uuid, action.isExpanded);
			break;
		default:
			return true;
	}

	AnswersStore.emitChange();
	return true;
});

module.exports = AnswersStore;
