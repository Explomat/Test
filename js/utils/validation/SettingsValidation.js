var Validation = require('./Validation');

module.exports = {

	isValidPassingScore: function (_val) {
		var val = Number(_val);
		if (isNaN(val)) return false;
		return Validation.isNumberNotNull(_val) || _val.trim() === '' || val === 0;
	},

	isValidDuration: function (_val) {
		var val = Number(_val);
		if (!val) return false;
		return Validation.isNumberNotNull(_val) || _val.trim() === '' || val === 0;
	},

	isValidAttemptsCount: function(_val){
		var val = Number(_val);
		if (!val) return false;
		return Validation.isNumberNotNull(_val);
	}
}