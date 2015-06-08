var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var QuestionConstants = require('../constants/QuestionConstants');
var _ = require('underscore');

var _answer = {};

function loadAnswerData(data) {
	_answer = data.answers[0];
}

var AnswerStore = _.extend({}, EventEmitter.prototype, {

	getAnswer: function() {
		return _answer;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callBack) {
		this.on('change', callBack)
	},

	removeChangeListener: function(callBack) {
		this.removeListener('change', callBack);
	}	

});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){

		case QuestionConstants.RECEIVE_DATA:
			loadAnswerData(action.data);
			break;
		default:
			return true;
	}

	AnswerStore.emitChange();
	return true;
});
