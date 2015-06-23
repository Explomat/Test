var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var QuestionConstants = require('../constants/QuestionConstants');
var UUID = require('../../../utils/UUID');
var QuestionTypes = require('../utils/QuestionTypes');
var SubAnswer = require('../utils/SubAnswer');
var _ = require('underscore');

var _answers = [], _question = {}, _displayTypes = false;

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

function addAnswer(){
	_answers.push({
		uuid: UUID.generate(),
		text: '',
		weight: ''
	});
}

function removeAnswer(uuid) {
	var ansIndex = _answers.findIndex(function(ans){
		return ans.uuid == uuid;
	});
	if (ansIndex != -1 && _answers.length > 1)
		_answers.splice(ansIndex, 1);
}

function displayTypes(isDisplay){
	_displayTypes = isDisplay;
}

function selectType(type){
	if (type == QuestionTypes.keys.multiple_choice){
		_answers.forEach(function(item){
			item.selected = false;
		});	
	}
	_question.type = type;
}

function shiftUp(uuid) {
	_shift(_answers, 1);
}

function shiftDown(uuid) {
	_shift(_answers, _answers.length - 1);
}

function addAnswerCondidtion(uuid) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.conditions = ans.conditions || [];
		ans.conditions.push({
			uuid: UUID.generate(),
			text: '',
			condition: SubAnswer.conditions.keys.equal
		});
	}
}

function removeAnswerCondidtion(uuid, conditionUuid) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		var index = null;
		ans.conditions = ans.conditions || [];
		var cond = ans.conditions.find(function(cond, i){
			index = i;
			return cond.uuid == conditionUuid;
		});
		if (cond && ans.conditions.length > 1)
			ans.conditions.splice(index, 1);
	}
}

function addAnswerConformity(uuid) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.conformities = ans.conformities || [];
		ans.conformities.push({
			uuid: UUID.generate(),
			text: '',
			conformity: SubAnswer.conformities.keys.equal
		});
	}
}

function removeAnswerConformity(uuid, conformityUuid) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		var index = null;
		ans.conformities = ans.conformities || [];
		var conf = ans.conformities.find(function(conf, i){
			index = i;
			return conf.uuid == conformityUuid;
		});
		if (conf && ans.conformities.length > 1)
			ans.conformities.splice(index, 1);
	}
}
function selectAnswer(uuid, selected){
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		if (_question.type == QuestionTypes.keys.multiple_choice){
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

function changeAnswerImg(uuid, img) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans)
		ans.img = img;
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

	isDisplayTypes: function() {
		return _displayTypes;
	},

	getTypeSelected: function() {
		return _question.type;
	},

	getConditions: function(uuid) {
		var ans = _answers.find(function(item){
			return item.uuid == uuid;
		});
		if (ans)
			return ans.conditions || [];
		return [];
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
			addAnswer();
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
		case QuestionConstants.ANSWER_ADD_CONDITION:
			addAnswerCondidtion(action.uuid);
			break;
		case QuestionConstants.ANSWER_REMOVE_CONDITION:
			removeAnswerCondidtion(action.uuid, action.conditionUuid);
			break;
		case QuestionConstants.ANSWER_ADD_CONFORMITY:
			addAnswerConformity(action.uuid);
			break;
		case QuestionConstants.ANSWER_REMOVE_CONFORMITY:
			removeAnswerConformity(action.uuid, action.conformity);
			break;
		case QuestionConstants.ANSWER_SELECTED:
			selectAnswer(action.uuid, action.selected);
			break;
		case QuestionConstants.ANSWER_CHANGE_TEXT:
			changeAnswerText(action.uuid, action.text);
			break;
		case QuestionConstants.ANSWER_CHANGE_WEIGHT:
			changeAnswerWeight(action.uuid, action.weight);
			break;
		case QuestionConstants.ANSWER_CHANGE_IMG:
			changeAnswerImg(action.uuid, action.img);
			break;
		default:
			return true;
	}

	QuestionStore.emitChange();
	return true;
});

module.exports = QuestionStore;
