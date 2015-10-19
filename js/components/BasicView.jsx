var React = require('react');
var Config = require('../config');
var BIconView = require('./modules/BIcon');
//var MappingStore = require('../stores/MappingStore');
//var MappingActions = require('../actions/SectionActions');

var BasicView = React.createClass({

	componentDidMount: function() {
		//MappingStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		//MappingStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		//this.setState(getMappingState());
	},

	render: function () {
		return (
			<div id="app-container" className="container tests">
				<div className="tests__header">
					<BIconView bclass={'glyphicon glyphicon-option-vertical'}/>
				</div>
			    <div id="app" className="tests__body"></div>
			</div>
		);
	}
});

module.exports = BasicView;