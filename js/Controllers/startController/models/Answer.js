var UUID = require('../../../utils/UUID');
var Condition = require('./Condition');
var ConditionText = require('./ConditionText');
var Conformity = require('./Conformity');

module.exports = function(){
	this.uuid = UUID.generate();
	this.text = '';
	this.weight = '';
	this.height = 20;
	this.width = 1;
	this.img = null;
	this.conditions = [ new Condition() ];
	this.conditionsText = [ new ConditionText() ];
	this.conformities = [ new Conformity() ];
}