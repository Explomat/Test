module.exports = {
	
	isNumber: function(val){
		if (val.trim() == "")
			return true;
		return /^[1-9]{1,}(\d+)?$/.test(val);
	},

	isNumberOrReal: function(val){
		if (val.trim() == "")
			return true;
		return /^([1-9]{1,}(\d+)?|[0-9]{1,}\.(\d+))$/.test(val);
	}
}