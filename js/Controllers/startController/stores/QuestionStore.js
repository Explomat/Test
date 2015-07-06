var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var QuestionConstants = require('../constants/QuestionConstants');
var ServerConstants = require('../constants/ServerConstants');
var AnswersStore = require('./AnswersStore');
var QuestionTypes = require('../utils/QuestionTypes');
var _ = require('underscore');

var _question = {}, _displayTypes = false;

function loadQuestionData(data) {
	_question = data;
	AnswersStore.setAnswers(data.answers);
}

function setTitle(title) {
	_question.title = title;
}

function setText(txt) {
	_question.text = txt;
}

function displayTypes(isDisplay){
	_displayTypes = isDisplay;
}

function selectType(type){
	if (type == QuestionTypes.keys.multiple_choice){
		AnswersStore.resetSelected();
	}
	_question.type = type;
}

var QuestionStore = _.extend({}, EventEmitter.prototype, {

	getTitle: function(){
		return _question.title;
	},

	getText: function() {
		return _question.text;
	},

	isDisplayTypes: function() {
		return _displayTypes;
	},

	getTypeSelected: function() {
		return _question.type;
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

QuestionStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case ServerConstants.RECEIVE_DATA:
			loadQuestionData(action.data);
			break;
		case QuestionConstants.DISPLAY_TYPES:
			displayTypes(action.isDisplay);
			break;
		case QuestionConstants.SET_TYPE_SELECTED:
			selectType(action.type);
			break;
		case QuestionConstants.SET_TITLE:
			setTitle(action.title);
			break;
		case QuestionConstants.SET_TEXT:
			setText(action.text);
			break;
		default:
			return true;
	}

	QuestionStore.emitChange();
	return true;
});

module.exports = QuestionStore;
