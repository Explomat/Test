var UUID = require('../utils/UUID');
var SectionKeys = require('../utils/SectionKeys');
//var Question = require('./Question');

function Section(args) {
	var args = args || {};
	this.uuid = args.uuid || UUID.generate();
	this.title = args.title || '';
	this.passingScore = args.passingScore || '';
	this.duration = args.duration || '';
	this.order = args.order || SectionKeys.order.keys.Sequential;
	this.selection = args.selection || SectionKeys.selection.keys.all;
	this.questions = args.questions || [];//[ new Question({text: 'Вопрос'}), new Question({text: 'Вопрос1'}), new Question({text: 'Вопрос2'}), new Question({text: 'Вопрос3'}), new Question({text: 'Вопрос4'}), new Question({text: 'Вопрос5'}), new Question({text: 'Вопрос6'})];
	this.selected = args.selected || false;
}

module.exports = Section;