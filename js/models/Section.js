var UUID = require('../utils/UUID');
var SectionKeys = require('../utils/SectionKeys');

function Section(args) {
	var args = args || {};
	this.uuid = args.uuid || UUID.generate();
	this.title = args.title || 'Default name';
	this.passingScore = args.passingScore || '';
	this.duration = args.duration || '';
	this.order = args.order || SectionKeys.order.keys.Sequential;
	this.selection = args.selection || SectionKeys.selection.keys.all;
	this.questions = args.questions || [];
	this.selected = args.selected || false;
}

module.exports = Section;