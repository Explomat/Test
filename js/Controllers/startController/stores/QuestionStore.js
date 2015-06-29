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

function loadQuestionData(data) {http://localhost:8003/#settings
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
	var ans = {
		uuid: UUID.generate(),
		text: '',
		weight: ''
	}

	ans.conditions = ans.conditions || [];
	ans.conditionsText = ans.conditionsText || [];
	ans.conformities = ans.conformities || [];
	ans.conditions.push({ uuid: UUID.generate(), text: '', condition: 'equal'});
	ans.conditionsText.push({ uuid: UUID.generate(), text: '', condition: 'equal' });
	ans.conformities.push({ uuid: UUID.generate(), text: '' });
	_answers.push(ans);
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

function addAnswerCondition(uuid) {
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

function removeAnswerCondition(uuid, conditionUuid) {
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

function changeAnswerCondition(uuid, conditionUuid, text, condition){
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.conditions = ans.conditions || [];
		var cond = ans.conditions.find(function(cond){
			return cond.uuid == conditionUuid;
		});
		if (cond){
			cond.text = text || cond.text;
			cond.condition = condition || cond.condition;
		}
	}
}

function addAnswerConditionText(uuid, conditionUiid){
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.conditionsText = ans.conditionsText || [];
		ans.conditionsText.push({
			uuid: UUID.generate(),
			text: '',
			condition: SubAnswer.conditionsText.keys.equal
		});
	}
}


function removeAnswerConditionText(uuid, conditionUuid) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		var index = null;
		ans.conditionsText = ans.conditionsText || [];
		var cond = ans.conditionsText.find(function(cond, i){
			index = i;
			return cond.uuid == conditionUuid;
		});
		if (cond && ans.conditionsText.length > 1)
			ans.conditionsText.splice(index, 1);
	}
}

function changeAnswerConditionText(uuid, conditionUuid, text, condition){
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.conditionsText = ans.conditionsText || [];
		var cond = ans.conditionsText.find(function(cond){
			return cond.uuid == conditionUuid;
		});
		if (cond){
			cond.text = text || cond.text;
			cond.condition = condition || cond.condition;
		}
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
			text: ''
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

function changeAnswerConformity(uuid, conformityUuid, text) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		ans.conformities = ans.conformities || [];
		var cond = ans.conformities.find(function(cond){
			return cond.uuid == conformityUuid;
		});
		if (cond)
			cond.text = text || cond.text;
	}
}

function changeAnswerSize(uuid, width, height) {
	var ans = _answers.find(function(item){
		return item.uuid == uuid;
	});
	if (ans){
		console.log(ans);
		ans.width = width || ans.width;
		ans.height = height || ans.height;
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

	getConditionsText: function(uuid) {
		var ans = _answers.find(function(item){
			return item.uuid == uuid;
		});
		if (ans)
			return ans.conditionsText || [];
		return [];
	},

	getConformities: function(uuid) {
		var ans = _answers.find(function(item){
			return item.uuid == uuid;
		});
		if (ans)
			return ans.conformities || [];
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
			addAnswerCondition(action.uuid);
			break;
		case QuestionConstants.ANSWER_REMOVE_CONDITION:
			removeAnswerCondition(action.uuid, action.conditionUuid);
			break;
		case QuestionConstants.ANSWER_CHANGE_CONDITION:
			changeAnswerCondition(action.uuid, action.conditionUuid, action.text, action.type);
			break;

		case QuestionConstants.ANSWER_ADD_CONDITIONTEXT:
			addAnswerConditionText(action.uuid);
			break;
		case QuestionConstants.ANSWER_REMOVE_CONDITIONTEXT:
			removeAnswerConditionText(action.uuid, action.conditionUuid);
			break;
		case QuestionConstants.ANSWER_CHANGE_CONDITIONTEXT:
			changeAnswerConditionText(action.uuid, action.conditionUuid, action.text, action.type);
			break;

		case QuestionConstants.ANSWER_ADD_CONFORMITY:
			addAnswerConformity(action.uuid);
			break;
		case QuestionConstants.ANSWER_REMOVE_CONFORMITY:
			removeAnswerConformity(action.uuid, action.conformityUuid);
			break;
		case QuestionConstants.ANSWER_CHANGE_CONFORMITY:
			changeAnswerConformity(action.uuid, action.conformityUuid, action.text);
			break;
		
		case QuestionConstants.ANSWER_CHANGE_SIZE:
			changeAnswerSize(action.uuid, action.width, action.height);
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
