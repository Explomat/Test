var UUID = require('../utils/UUID');
var SubAnswer = require('../utils/SubAnswer');

module.exports = function(args) {
	var args = args || {};
	this.uuid = args.uuid || UUID.generate();
	this.text = args.text || '';
	this.condition = args.condition || SubAnswer.conditionsText.keys.equal;
}

