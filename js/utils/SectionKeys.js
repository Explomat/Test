var keyMirror = require('keyMirror');

module.exports = {

	order: {
		
		keys: keyMirror({
			Sequential: null,
			Random: null
		}),

		values: {
			Sequential: 'Последовательно',
			Random: 'Случайно'
		}
	},

	selection: {

		keys: keyMirror({
			all: null,
			num_generate: null,
			point: null
		}),

		values: {
			all: 'Все',
			num_generate: 'Выборка по числу вопросов при генерации',
			point: 'Выборка по весу вопросов при генерации'
		}
	}
}