var UUID = require('../../../utils/UUID');
var SubAnswer = require('../utils/SubAnswer');

module.exports = function(text, conditionText) {
	this.uuid = UUID.generate();
	this.text = text || '';
	this.condition =  conditionText || SubAnswer.conditionsText.keys.equal;
}