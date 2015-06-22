var keyMirror = require('react/lib/keyMirror');

var SubAnswer = {

	conditions: {
		values: {
			equal: '=',
			more: '>',
			less: '<',
			moreOrEqual: '>=',
			lessOrEqual: '<='
		},

		keys: keyMirror({
			equal: null,
			more: null,
			less: null,
			moreOrEqual: null,
			lessOrEqual: null
		})
	},

	conformities: {
		values: {
			equal: 'равен',
			contains: 'содержит'
		},

		keys: keyMirror({
			equal: null,
			contains: null
		})
	}
};

module.exports = SubAnswer;