var UUID = require('../utils/UUID');
var Answer = require('./Answer');
var QuestionTypes = require('../utils/QuestionTypes');

function Question(args){
	var args = args || {};
	this.uuid = args.uuid || UUID.generate();
	this.text = args.text || '';
	this.weight = args.weight || 1;
	this.type = args.type || QuestionTypes.keys.multiple_choice;
	this.img = args.img || null;
	this.answers = args.answers || [ new Answer({text: 'Ответ', expanded: true}), new Answer({text: 'Ответ1'}),new Answer({text: 'Ответ2'}),new Answer({text: 'Ответ3'}) ];
}

module.exports = Question;