var UUID = require('../../../utils/UUID');
var SubAnswer = require('../utils/SubAnswer');

module.exports = function() {
	this.uuid = UUID.generate();
	this.text = '';
	this.condition =  SubAnswer.conditionsText.keys.equal;
}