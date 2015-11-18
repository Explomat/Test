var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MappingConstants = require('../constants/MappingConstants');
var extend = require('extend');

var _data = {};

function loadMappingData(data){
	_data = data;
}

var MappingStore = extend({}, EventEmitter.prototype, {
	
	getData: function(){
		return _data;
	},

	getQuestionsCount: function(){
		var count = 0;
		for (var i = _data.structure.sections.length - 1; i >= 0; i--) {
			count += _data.structure.sections[i].questions.length;
		};
		return count;
	},

	getMaxPassingScore: function(){
		var count = 0;
		for (var i = _data.structure.sections.length - 1; i >= 0; i--) {
			var section = _data.structure.sections[i];
			for (var j = section.questions.length - 1; j >= 0; j--) {
				var question = section.questions[j];
				for (var k = question.answers.length - 1; k >= 0; k--) {
					count += Number(question.answers[k].weight);
				};
			};
		};
		return count;
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

MappingStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case MappingConstants.RECEIVE_MAPPING_DATA:
			loadMappingData(action.data);
			break;
		default:
			return true;
	}

	MappingStore.emitChange();
	return true;
});

module.exports = MappingStore;
