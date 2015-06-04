var storage = require('../../../utils/Storage');
var questionActions = require('../actions/QuestionActions');

module.exports = {
	getQuestionData: function() {
		var question = storage.getItem('question');
		questionActions.receiveQuestion(question);
	}
}