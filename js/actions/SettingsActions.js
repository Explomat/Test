var AppDispatcher = require('../dispatcher/AppDispatcher');
var SettingsConstants = require('../constants/SettingsConstants');

var SettingsActions = {

	receiveSettings: function(data) {
		AppDispatcher.handleAction({
			actionType: SettingsConstants.RECEIVE_SETTINGS_DATA,
			data: data
		});
	},

	changeTitle: function(title){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_TITLE,
			title: title
		});
	},

	changePassingScore: function(passingScore){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_PASSING_SCORE,
			passingScore: passingScore
		});
	},

	changeDurationMinutes: function(durationMinutes){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_DURATION_MINUTES,
			durationMinutes: durationMinutes
		});
	},	

	changeDurationDays: function(durationDays){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_DURATION_DAYS,
			durationDays: durationDays
		});
	},

	changeAttemptsCount: function(attemptsCount){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_ATTEMPTS_COUNT,
			attemptsCount: attemptsCount
		});
	},

	changeNotSentCorrectAnswer: function(val){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_NOT_SENT_CORRECT_ANSWER,
			val: val
		});
	},

	changeDisplayResult: function(val){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_DISPLAY_RESULT,
			val: val
		});
	},

	changeNotDisplayLastAttempt: function(val){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_NOT_DISPLAY_LAST_ATTEMPT,
			val: val
		});
	},

	changeDisplayAnswersInReport: function(val){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_DISPLAY_ANSWERS_IN_REPORT,
			val: val
		});
	},	

	changeDisplayCorrectAnswerInReport: function(val){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_DISPLAY_CORRECT_ANSWER_IN_REPORT,
			val: val
		});
	},

	changeNotDisplayUnfinishedScore: function(val){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.CHANGE_NOT_DISPLAY_UNFINISHED_SCORE,
			val: val
		});
	},

}

module.exports = SettingsActions;