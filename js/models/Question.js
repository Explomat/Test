var UUID = require('../utils/UUID');
var Answer = require('./Answer');
var QuestionTypes = require('../utils/QuestionTypes');

function Question(args){
	var args = args || {};
	this.uuid = args.uuid || UUID.generate();
	this.title = args.title || 'Temp';
	this.text = args.text || 'What\'s the Fuck?';
	this.type = args.type || QuestionTypes.keys.match_item;
	this.img = args.img || null;
	this.answers = args.answers || [ new Answer() ];
}

module.exports = Question;