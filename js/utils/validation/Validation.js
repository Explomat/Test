module.exports = {
	
	isNumber: function(val){
		return /^[0-9]{1,}(\d+)?$/.test(val);
	},

	isNumberNotNull: function(val){
		return /^[1-9]{1,}(\d+)?$/.test(val);
	},

	isNumberOrEmpty: function(val){
		return /^[0-9]{1,}(\d+)?$/.test(val);
	},

	isNumberMax: function(val, maxVal){
		return ((/^[0-9]{1,}(\d+)?$/.test(val)) && (Number(val) <= Number(maxVal)));
	},

	isNumberOrReal: function(val){
		return /^([0-9]{1,}(\d+)?|[0-9]{1,}\.(\d+))$/.test(val);
	},

	isNegativeNumberOrReal: function(val){
		return /^-?([0-9]{1,}(\d+)?|[0-9]{1,}\.(\d+))$/.test(val);
	}
}