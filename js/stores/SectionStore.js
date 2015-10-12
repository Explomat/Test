var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SectionConstants = require('../constants/SectionConstants');
var extend = require('extend-object');

var _section = {};

function loadSectionData(data) {
	_section = data;
}

function changeTitle(title){
	_section.title = title;
}

function changePassingScore(score){
	_section.passingScore = score;
}

function changeDuration(duration){
	_section.duration = duration;
}

function changeOrder(order){
	_section.order = order;
}

function changeSelection(selection){
	_section.selection = selection;
}

var SectionStore = extend({}, EventEmitter.prototype, {
	
	getSection: function(){
		return _section;
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

SectionStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case SectionConstants.RECEIVE_SECTION_DATA:
			loadSectionData(action.data);
			break;
		case SectionConstants.CHANGE_SECTION_TITLE:
			changeTitle(action.title);
			break;
		default:
			return true;
	}

	SectionStore.emitChange();
	return true;
});

module.exports = SectionStore;
