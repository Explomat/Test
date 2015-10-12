var SubAnswer = require('./SubAnswer');

module.exports = {

	evalCondition: function (firstValue, secondValue, conditionKey) {
		var condition = SubAnswer.conditions.values[conditionKey];
		if (!condition || !firstValue || !secondValue) return false;

		firstValue = Number(firstValue.trim());
		secondValue = Number(secondValue.trim());

		switch (condition){
			case SubAnswer.conditions.values.equal:
				return firstValue === secondValue;
			case SubAnswer.conditions.values.more:
				return firstValue > secondValue;
			case SubAnswer.conditions.values.less:
				return firstValue < secondValue;
			case SubAnswer.conditions.values.moreOrEqual:
				return firstValue >= secondValue;
			case SubAnswer.conditions.values.lessOrEqual:
				return firstValue <= secondValue;
			default:
				return false;
		}
	},

	evalConditionText: function(firstValue, secondValue, conditionTextKey){
		var conditionText = SubAnswer.conditionsText.values[conditionTextKey];
		if (!conditionText || !firstValue || !secondValue) return false;

		switch (conditionText) {
			case SubAnswer.conditionsText.values.equal:
				return firstValue === secondValue;
			case SubAnswer.conditionsText.values.contains:
				return firstValue.indexOf(secondValue) !== -1;
			default:
				return false;
		}
	}
}