var React = require('react');
var MappingStore = require('../stores/MappingStore');
var MappingActions = require('../actions/SectionActions');

function getMappingState() {
	return {
		data: MappingStore.getData()
	};
}

var MappingView = React.createClass({

	componentDidMount: function() {
		MappingStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		MappingStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getMappingState());
	},

	getInitialState: function () {
		return getMappingState();
	},

	render: function () {
		return (
			<div>
				a
			</div>
		);
	}
});

module.exports = MappingView;