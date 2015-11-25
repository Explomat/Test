var Validation = require('./Validation');

module.exports = {

	isValidWeight: function (_val) {
		var val = Number(_val);
		if (isNaN(val)) return false;
		return Validation.isNumberNotNull(_val) || _val.trim() === '' || val === 0;
	}
}