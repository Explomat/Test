var UUID = require('../../../utils/UUID');

module.exports = function(){
	this.uuid = UUID.generate();
	this.text = '';
}