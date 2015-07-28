var UUID = require('../../../utils/UUID');

module.exports = function(text){
	this.uuid = UUID.generate();
	this.text = text || '';
}