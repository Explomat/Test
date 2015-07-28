var UUID = require('../../../utils/UUID');
var Answer = require('./Answer');

module.exports = function(){
	this.uuid = UUID.generate();
	this.title = 'Temp';
	this.text = 'What\'s the Fuck?';
	this.type = 'match_item';
	this.img = null;
	this.answers = [new Answer()];
}