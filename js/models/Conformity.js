var UUID = require('../utils/UUID');

module.exports = function(args){
	var args = args || {};
	this.uuid = args.uuid || UUID.generate();
	this.text = args.text || '';
}