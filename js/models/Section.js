var UUID = require('../utils/UUID');
var Question = require('./Question');

function Section(args) {
	var args = args || {};
	this.uuid = args.uuid || UUID.generate();
	this.name = args.name || 'Default name';
	this.questions = args.questions || [];
}

module.exports = Section;