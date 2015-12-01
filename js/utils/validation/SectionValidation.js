var Validation = require('./Validation');

module.exports = {

	isValidPassingScore: function (_val) {
		var val = Number(_val);
		if (isNaN(val)) return false;
		return Validation.isNumberNotNull(_val) || _val.toString().trim() === '' || val === 0;
	},

	isValidDuration: function (_val) {
		var val = Number(_val);
		if (isNaN(val)) return false;
		return Validation.isNumberNotNull(_val) || _val.toString().trim() === '' || val === 0;
	}
}