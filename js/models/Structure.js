var Section = require('./Section');

function Structure(args) {
	var args = args || {};
	this.questions = args.sections || [ new Section() ];
}

module.exports = Structure;