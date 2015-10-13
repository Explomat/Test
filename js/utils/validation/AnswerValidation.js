var Validation = require('./Validation');

module.exports = {

	isValidWeight: function (_val) {
		var val = Number(_val);
		if (isNaN(val)) return false;
		return Validation.isNumberNotNull(_val) || _val.trim() === '' || val === 0;
	},

	isValidHeight: function (_val) {
		var val = Number(_val);
		if (isNaN(val)) return false;
		return Validation.isNumberNotNull(_val);
	},

	isValidWidth: function (_val) {
		var val = Number(_val);
		if (isNaN(val)) return false;
		return Validation.isNumberNotNull(_val);
	},

	isValidCondition: function (_val) {
		var val = Number(val);
		if (isNaN(val)) return false;
		return Validation.isNumber(val);
	}
}