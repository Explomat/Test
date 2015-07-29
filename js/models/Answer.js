var UUID = require('../utils/UUID');
var Condition = require('./Condition');
var ConditionText = require('./ConditionText');
var Conformity = require('./Conformity');

module.exports = function(args){
	var args = args || {};
	this.uuid = args.uuid || UUID.generate();
	this.text = args.text || '';
	this.weight = args.weight || '';
	this.height = args.height || 20;
	this.width = args.width || 1;
	this.img = args.img || null;
	this.conditions = args.conditions || [new Condition()];
	this.conditionsText = args.conditionsText || [new ConditionText()];
	this.conformities = args.conformities || [new Conformity()];
}