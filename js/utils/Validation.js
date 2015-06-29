module.exports = {
	
	isNumber: function(val){
		if (val.trim() == "")
			return true;
		return /^[1-9]{1,}(\d+)?$/.test(val);
	}
}