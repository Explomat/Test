var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var QuestionConstants = require('../constants/QuestionConstants');
var _ = require('underscore');

var _answers = [], _imgVisible = false, _weigthVisible = false;

function addAnswer(answer){
	_answers.push(answer);
}

function removeAnswer(uuid) {
	var ans = _answers.filter(function(ans){
		return ans.uuid !==  uuid;
	});
}

var QuestionStore = _.extend({}, EventEmitter.prototype, {

	getAnswers: function() {
		return _answers;
	},

	getAnswersCount: function() {
		return _answers.length;
	},

	getImgVisible: function() {

	},

	getWeightVisible: function() {

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
