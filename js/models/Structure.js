var Section = require('./Section');

function Structure(args) {
	var args = args || {};
	this.sections = args.sections ||  [ new Section({title: 'Test'}), new Section({title: 'Test_1'}), new Section({title: 'Test_2'}), new Section({title: 'Test_3'}) ];
}

module.exports = Structure;