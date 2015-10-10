var SubAnswer = require('./SubAnswer');

module.exports= {

	evalCondition: function (firstValue, secondValue, conditionKey) {
		var condition = SubAnswer.conditions.values[conditionKey];
		if (!condition || !firstValue || !secondValue) return false;

		firstValue = Number(firstValue.trim());
		secondValue = Number(secondValue.trim());

		switch (condition){
			case '=':
				return firstValue === secondValue;
			case '>':
				return firstValue > secondValue;
			case '<':
				return firstValue < secondValue;
			case '>=':
				return firstValue >= secondValue;
			case '<=':
				return firstValue <= secondValue;
			default:
				return false;
		}
	},

	evalConditionText: function(firstValue, secondValue, conditionTextKey){
		var conditionText = SubAnswer.conditionsText.values[conditionTextKey];
		if (!conditionText || !firstValue || !secondValue) return false;

		switch (conditionText) {
			case 'равен':
				return firstValue === secondValue;
			case 'содержит':
				return firstValue.indexOf(secondValue) !== -1;
			default:
				return false;
		}
	}
}