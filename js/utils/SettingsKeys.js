var keyMirror = require('keyMirror');

module.exports = {

	status: {
		
		keys: keyMirror({
			publish: null,
			project: null,
			secret: null
		}),

		values: {
			publish: 'Открытый',
			project: 'Проект',
			secret: 'Скрытый'
		}
	},

	redirect: {

		keys: keyMirror({
			main: null,
			active_test_learning: null,
			test_learning: null,
		}),

		values: {
			main: 'Главную страницу',
			active_test_learning: 'Страницу активных тестов',
			test_learning: 'Страницу завершенных тестов',
		}
	}
}