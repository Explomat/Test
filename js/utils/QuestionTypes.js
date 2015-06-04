var QuiestionTypes = {

	values:{
		'multiple_choice':'Единственный выбор',
		'multiple_response':'Множественный выбор',
		'order':'Ранжирование',
		'gap_fill':'Соответствие',
		'numerical_fill_in_blank':'Текстовый ввод',
		'match_item':'Цифровой ввод'
	},

	toArray:function() {
		return (Object.keys(this.values).map(function(key){
			var obj = {};
			Object.defineProperty(obj, key,{
				value: this.values[key],
				writable: true,
				enumerable: true,
				configurable: true
			});
	    	return obj;
	    }.bind(this)));
	}
};

module.exports = QuiestionTypes;