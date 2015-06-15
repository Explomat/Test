var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var QuestionConstants = require('../constants/QuestionConstants');
var _ = require('underscore');


var _answers = [], _question = {}, _imgVisible = false, _weigthVisible = false, _displayTypes = false, _typeSelected = 'gap_fill';

function _shift(arr, k) {
	var n = arr.length;
    k = k % n;
    reverse(arr, 0, n - 1);
    reverse(arr, 0, n - k - 1);
    reverse(arr, n - k, n - 1);

    function reverse(arr, start, end) {
		while (start < end) {
	        var tmp = arr[start];
	        arr[start] = arr[end];
	        arr[end] = tmp;
	        start++;
	        end--;
	    }
	}
}

function loadQuestionData(data) {
	_question = data;
	_answers = data.answers;
}

function setTitle(title) {
	_question.title = title;
}

function setText(txt) {
	_question.text = txt;
}

function addAnswer(answer){
	_answers.push(answer);
}

function removeAnswer(uuid) {
	var ansIndex = _answers.findIndex(function(ans){
		return ans.uuid == uuid;
	});
	if (ansIndex != -1)
		_answers.splice(ansIndex, 1);
}

function setImgVisible(imgVisible) {
	_imgVisible = imgVisible;
}

function setWeightVisible(weightVisible) {
	_weigthVisible = weightVisible;
}

function displayTypes(isDisplay){
	_displayTypes = isDisplay;
}

function selectType(type){
	_typeSelected = type;
}

function shiftUp() {
	
}

function shiftDown() {
	
}

var QuestionStore = _.extend({}, EventEmitter.prototype, {

	getTitle: function(){
		return _question.title;
	},

	getText: function() {
		return _question.text;
	},	

	getAnswers: function() {
		return _answers;
	},

	getAnswersCount: function() {
		return _answers.length;
	},

	getImgVisible: function() {
		return _imgVisible;
	},

	getWeightVisible: function() {
		return _weigthVisible;
	},

	isDisplayTypes: function() {
		return _displayTypes;
	},

	getTypeSelected: function() {
		return _typeSelected;
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

AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case QuestionConstants.RECEIVE_DATA:
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
		case QuestionConstants.ANSWER_ADD:
			addAnswer(action.answer);
			break;
		case QuestionConstants.ANSWER_REMOVE:
			removeAnswer(action.uuid);
			break;
		case QuestionConstants.ANSWER_SHIFT_UP:
			shiftUp(action.uuid);
			break;
		case QuestionConstants.ANSWER_SHIFT_DOWN:
			shiftDown(action.uuid);
			break;
		case QuestionConstants.IMG_VISIBLE:
			setImgVisible(action.imgVisible);
			break;
		case QuestionConstants.WEIGHT_VISIBLE:
			setWeightVisible(action.weightVisible);
			break;
		default:
			return true;
	}

	QuestionStore.emitChange();
	return true;
});

module.exports = QuestionStore;
