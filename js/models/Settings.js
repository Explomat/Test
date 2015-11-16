var SettingsKeys = require('../utils/SettingsKeys');

function Settings(_args) {
	var args = _args || {};
	this.title = args.title || 'Default name';
	this.passingScore = args.passingScore || '';
	this.durationMinutes = args.durationMinutes || ''; 
	this.durationDays = args.durationDays || '';
	this.attemptsCount = args.attemptsCount || 1;
	this.notSentCorrectAnswer = args.notSentCorrectAnswer || false; //Не передавать проигрывателю информацию о правильных ответах на вопросы
	this.displayResult = args.displayResult || false; //Показывать результаты теста (резюме по тесту)
	this.notDisplayLastAttempt = args.notDisplayLastAttempt || false; //Не показывать сообщение об исчерпании попыток ответа
	/*this.notDisplayFeedback = args.notDisplayFeedback || false; //Не показывать в данном тесте сообщения обратной связи
	this.displayResultReport = args.displayResultReport || false;  //Показывать отчет о результатах теста*/
	this.displayAnswersInReport = args.displayAnswersInReport || true; //Показывать варианты ответов в отчете по тестированию
	this.displayCorrectAnswerInReport = args.displayCorrectAnswerInReport || true; //Показывать правильный ответ в отчете по тестированию
	this.notDisplayUnfinishedScore = args.notDisplayUnfinishedScore || false; //Не показывать набранных балл для незавершенных тестов
	this.testFinishRedirect = args.testFinishRedirect || SettingsKeys.redirect.keys.active_test_learning; 
	this.isExpanded = args.isExpanded || true;
}

module.exports = Settings;