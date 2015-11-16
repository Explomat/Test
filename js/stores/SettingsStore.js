var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SettingsAPI = require('../api/SettingsAPI');
var SettingsConstants = require('../constants/SettingsConstants');
var extend = require('extend');

var _settings = {};

function loadSettingsData(data) {
	_settings = data;
}

function changeTitle (title){
	_settings.title = title;
}

function changePassingScore(passingScore){
	_settings.passingScore = passingScore;
}

function changeDurationMinutes(durationMinutes){
	_settings.durationMinutes = durationMinutes;
}	

function changeDurationDays(durationDays){
	_settings.durationDays = durationDays;
}

function changeAttemptsCount(attemptsCount){
	_settings.attemptsCount = attemptsCount;
}

function changeNotSentCorrectAnswer(val){
	_settings.notSentCorrectAnswer = val;
	if (val){
		_settings.displayResult = !val;
		_settings.notDisplayLastAttempt = !val;
	}
}

function changeDisplayResult(val){
	_settings.displayResult = val;
	if (val) {
		_settings.notSentCorrectAnswer = !val;
	}
}

function changeNotDisplayLastAttempt(val){
	_settings.notDisplayLastAttempt = val;
	if (val) {
		_settings.notSentCorrectAnswer = !val;
	}
}

function changeDisplayAnswersInReport(val){
	_settings.displayAnswersInReport = val;
}

function changeDisplayCorrectAnswerInReport(val){
	_settings.displayCorrectAnswerInReport = val;
}

function changeNotDisplayUnfinishedScore(val){
	_settings.notDisplayUnfinishedScore = val;
}

var SettingsStore = extend({}, EventEmitter.prototype, {
	
	getSettings: function(){
		return _settings;
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

SettingsStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case SettingsConstants.RECEIVE_SETTINGS_DATA:
			loadSettingsData(action.data);
			break;
		case SettingsConstants.CHANGE_TITLE:
			changeTitle(action.title);
			break;
		case SettingsConstants.CHANGE_PASSING_SCORE:
			changePassingScore(action.passingScore);
			break;
		case SettingsConstants.CHANGE_DURATION_MINUTES:
			changeDurationMinutes(action.durationMinutes);
			break;
		case SettingsConstants.CHANGE_DURATION_DAYS:
			changeDurationDays(action.durationDays);
			break;
		case SettingsConstants.CHANGE_ATTEMPTS_COUNT:
			changeAttemptsCount(action.attemptsCount);
			break;
		case SettingsConstants.CHANGE_NOT_SENT_CORRECT_ANSWER:
			changeNotSentCorrectAnswer(action.val);
			break;
		case SettingsConstants.CHANGE_DISPLAY_RESULT:
			changeDisplayResult(action.val);
			break;
		case SettingsConstants.CHANGE_NOT_DISPLAY_LAST_ATTEMPT:
			changeNotDisplayLastAttempt(action.val);
			break;
		case SettingsConstants.CHANGE_DISPLAY_ANSWERS_IN_REPORT:
			changeDisplayAnswersInReport(action.val);
			break;
		case SettingsConstants.CHANGE_DISPLAY_CORRECT_ANSWER_IN_REPORT:
			changeDisplayCorrectAnswerInReport(action.val);
			break;
		case SettingsConstants.CHANGE_NOT_DISPLAY_UNFINISHED_SCORE:
			changeNotDisplayUnfinishedScore(action.val);
			break;
		default:
			return true;
	}

	SettingsStore.emitChange();
	SettingsAPI.saveSettings(_settings);
	return true;
});

module.exports = SettingsStore;
