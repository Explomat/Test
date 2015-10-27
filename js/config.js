var serverId = '6166852566696923932';
var routerUrl = 'http://study.merlion.ru/custom_web_template.html?object_id=6135330846971222087';

module.exports = {

	url: {
		defaultPath: routerUrl.concat('&server_id='.concat(serverId)),
		createPath: function(obj){
			return this.defaultPath.concat(Object.keys(obj).map(function(k){
				return '&'.concat(k).concat('=').concat(obj[k]);
			}).join(''));
		}
	},

	icons: {
		loading: 'build/icons/loading.gif'
	},

	dom: {
		appId: 'app',
		modalId: 'modal'
	},

	hashes: {
		DEFAULT_HASH_KEY: 'settings',
		settings: { value: 'Общие сведения', key: 'settings' },
		structure: { value: 'Структура', key: 'structure' },
		section: { value: 'Создание/редактирование раздела',  key: 'structure/section/:sectionId:' },
		question: { value: 'Создание/редактирование вопроса', key: 'structure/question/{sectionId}/:questionId:' },
		view: { value: 'Отображение теста', key: 'view' }
	},

	setProductionMode: function () {
		process.env.NODE_ENV = 'production'
	}
}