//var Section = require('./Section');

function Structure(args) {
	var args = args || {};
	this.sections = args.sections ||  [];
}

module.exports = Structure;