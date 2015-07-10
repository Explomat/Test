var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AnswerConstants = require('../constants/AnswerConstants');
var ServerConstants = require('../constants/ServerConstants');
var UUID = require('../../../utils/UUID');
var QuestionTypes = require('../utils/QuestionTypes');
var SubAnswer = require('../utils/SubAnswer');
var _ = require('underscore');

var _answers = [], _questionType = '';

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

function addAnswer(){
	var ans = {
		uuid: UUID.generate(),
		text: '',
		weight: '',
		height: 20,
		width: 1,
		img: null,
		conditions: [{uuid: UUID.generate(), text: '', condition: 'equal'}],
		conditionsText: [{ uuid: UUID.generate(), text: '', condition: 'equal'}],
		conformities: [{ uuid: UUID.generate(), text: ''}],
	}
	_answers.push(ans);
}

function removeAnswer(uuid) {
	var ansIndex = _answers.findIndex(function(ans){
		return ans.uuid == uuid;
	});
	if (ansIndex != -1 && _answers.length > 1)
		_answers.splice(ansIndex, 1);
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
		ans.width = width || ans.width;
		ans.height = height || ans.height;
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

function errorUploadedAnswerImg(uuid, err) {
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

function removeAnswerImg(uuid, isRemoved){
	if (isRemoved == false)
		return;
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


var AnswersStore = _.extend({}, EventEmitter.prototype, {

	getAnswers: function() {
		return _answers;
	},

	setAnswers: function(answers){
		_answers = answers;
	},

	resetSelected: function() {
		_answers.forEach(function(item){
			item.selected = false;
		});
	},

	getAnswersCount: function() {
		return _answers.length;
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

	getAnswerImg: function(uuid) {
		var ans = _answers.find(function(item){
			return item.uuid == uuid;
		});
		if (ans)
			return ans.img;
	},

	setQuestionType: function(qType){
		_questionType = qType;
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

		case AnswerConstants.ANSWER_ADD_CONDITION:
			addAnswerCondition(action.uuid);
			break;
		case AnswerConstants.ANSWER_REMOVE_CONDITION:
			removeAnswerCondition(action.uuid, action.conditionUuid);
			break;
		case AnswerConstants.ANSWER_CHANGE_CONDITION:
			changeAnswerCondition(action.uuid, action.conditionUuid, action.text, action.type);
			break;

		case AnswerConstants.ANSWER_ADD_CONDITIONTEXT:
			addAnswerConditionText(action.uuid);
			break;
		case AnswerConstants.ANSWER_REMOVE_CONDITIONTEXT:
			removeAnswerConditionText(action.uuid, action.conditionUuid);
			break;
		case AnswerConstants.ANSWER_CHANGE_CONDITIONTEXT:
			changeAnswerConditionText(action.uuid, action.conditionUuid, action.text, action.type);
			break;

		case AnswerConstants.ANSWER_ADD_CONFORMITY:
			addAnswerConformity(action.uuid);
			break;
		case AnswerConstants.ANSWER_REMOVE_CONFORMITY:
			removeAnswerConformity(action.uuid, action.conformityUuid);
			break;
		case AnswerConstants.ANSWER_CHANGE_CONFORMITY:
			changeAnswerConformity(action.uuid, action.conformityUuid, action.text);
			break;
		case AnswerConstants.ANSWER_CHANGE_SIZE:
			changeAnswerSize(action.uuid, action.width, action.height);
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

		case ServerConstants.UPLOADED_IMAGE:
			uploadedAnswerImg(action.uuid, action.img);
			break;
		case ServerConstants.UPLOADED_ERROR_IMAGE:
			errorUploadedAnswerImg(action.uuid, action.err);
			break;
		case ServerConstants.REMOVE_IMAGE:
			removeAnswerImg(action.uuid, action.img);
			break;
		default:
			return true;
	}

	AnswersStore.emitChange();
	return true;
});

module.exports = AnswersStore;
