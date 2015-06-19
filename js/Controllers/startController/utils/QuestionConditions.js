var keyMirror = require('react/lib/keyMirror');

var QuiestionConditions = {

	values: {
		equal: '=',
		more: '>',
		less: '<',
		moreOrEqual: '>=',
		lessOrEqual: '<=',
		equalText: 'равен',
		containsText: 'содержит'
	},

	keys: keyMirror({
		equal: null,
		more: null,
		less: null,
		moreOrEqual: null,
		lessOrEqual: null,
		equalText: null,
		containsText: null
	})
};

module.exports = QuiestionConditions;