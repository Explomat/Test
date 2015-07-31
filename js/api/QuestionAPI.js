var Config = require('../config');
var Ajax = require('../utils/Ajax');

module.exports = {

	getQuestionData: function() {
		return Ajax.getQuestionData();
	},

	saveQuestionData: function(data) {
		return Ajax.saveQuestionData(data);
	},

	//eventTarget - DOM input for FileAPI
	uploadImage: function(eventTarget){
		return Ajax.uploadFiles(eventTarget, Config.url.createPath({action_name: 'uploadFile'}));
	},

	removeImage: function(img){
		return Ajax.sendRequest(Config.url.createPath({action_name: 'removeImage', id: img.id, name: img.name}));
	}
}