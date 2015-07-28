var UUID = require('../../../utils/UUID');
var SubAnswer = require('../utils/SubAnswer');

module.exports = function(text, condition) {
	this.uuid = UUID.generate();
	this.text = text || '';
	this.condition = condition || SubAnswer.conditions.keys.equal;
}