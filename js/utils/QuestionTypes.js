var keyMirror = require('keyMirror');

var QuestionTypes = {

	values: {
		multiple_choice: 'Единственный выбор',
		multiple_response: 'Множественный выбор',
		order: 'Ранжирование',
		gap_fill: 'Соответствие',
		numerical_fill_in_blank: 'Текстовый ввод',
		match_item: 'Цифровой ввод'
	},

	keys: keyMirror({
		multiple_choice: null,
		multiple_response: null,
		order: null,
		gap_fill: null,
		numerical_fill_in_blank: null,
		match_item: null
	})
};

module.exports = QuestionTypes;