var React = require('react');
var StructureStore = require('../stores/StructureStore');

function getStructureState() {
	return {
		data: StructureStore.getData()
	};
}

var StructureView = React.createClass({

	componentDidMount:function() {
		StructureStore.addChangeListener(this._onChange);
	},

	componentWillUnmount:function() {
		StructureStore.removeChangeListener(this._onChange);
	},

	_onChange:function() {
		this.setState(getStructureState());
	},

	getInitialState: function () {
		return getStructureState();
	},

	render:function () {
		console.log(this.state.data);
		return (
			<div className="panel panel-default">
				AAA
			</div>
		);
	}
});

module.exports = StructureView;