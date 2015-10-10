var Config = require('../config');
var Ajax = require('../utils/Ajax');
var Storage = require('../utils/Storage');
var Question = require('../models/Question');

module.exports = {

	createQuestion: function(){
		return new Question();
	},

	getQuestion: function(questionUuid){
		var structure = Storage.getItem('structure');
		if (!structure){
			throw new Error('Structure is not defined in storage');
			return;
		}
		var sections = structure.sections || [];
		for (var i = sections.length - 1; i >= 0; i--) {
			var questions = sections[i].questions;
			for (var j = questions.length - 1; j >= 0; j--) {
				if (questions[j].uuid == questionUuid) {
					return questions[j];
				}
			}

		}
		return null;
	},

	saveQuestionData: function(question, sectionUuid) {
		try {
			var structure = Storage.getItem('structure');
			if (!structure){
				throw new Error('Structure is not defined in storage');
				return;
			}
			var sections = structure.sections || [];
			var section = null;
			var isEdit = false;
			for (var i = sections.length - 1; i >= 0; i--) {
				if (sections[i].uuid == sectionUuid) {
					section = sections[i];
					var questions = section.questions;
					for (var j = questions.length - 1; j >= 0; j--) {
						if (questions[j].uuid == question.uuid) {
							questions[j] = question;
							isEdit = true;
							break;
						}
					}
					break;
				}
			}

			if (!isEdit && section) {
				section.questions.push(question);
			}
			Storage.setItem('structure', structure);
		}
		catch(e) { return false; }
		return true;
	},

	//eventTarget - DOM input tag for FileAPI
	uploadImage: function(eventTarget){
		return Ajax.uploadFiles(eventTarget, Config.url.createPath({action_name: 'uploadFile'}));
	},

	removeImage: function(img){
		return Ajax.sendRequest(Config.url.createPath({action_name: 'removeImage', id: img.id, name: img.name}));
	}
}