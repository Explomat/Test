var UUID = require('../utils/UUID');
var Condition = require('./Condition');
var ConditionText = require('./ConditionText');

module.exports = function(args){
	var args = args || {};
	this.uuid = args.uuid || UUID.generate();
	this.text = args.text || '';
	this.weight = args.weight || 0;
	this.height = args.height || 20;
	this.width = args.width || 1;
	this.img = args.img || null;
	this.condition = args.condition || new Condition();
	this.conditionText = args.conditionText || new ConditionText();
	this.conformity = args.conformity || '';

	/* additional properties for view */
	this.expanded = args.expanded || false;
	this.focused = args.focused || false;
}