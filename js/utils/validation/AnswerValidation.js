var Validation = require('./Validation');

module.exports = {

	isValidWeight: function (_val) {
		var val = Number(_val);
		if (isNaN(val)) return false;
		return Validation.isNumber(_val) || Validation.isNegativeNumberOrReal(_val) || _val.toString().trim() === '' || val === 0;
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
		var val = Number(_val);
		if (isNaN(val)) return false;
		return Validation.isNumber(_val) || _val.toString().trim() === '';
	}
}