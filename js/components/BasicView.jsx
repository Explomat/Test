var React = require('react');
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
			<div id="container">
				<h1>Tests</h1>
				<div id="app-container">
					<div className="list-group side-bar">
				    	<a href="#settings" className="list-group-item active">
				        	<span className="glyphicon glyphicon-wrench"></span> 
				        	<span>Основные сведения</span>
				    	</a>
				        <a href="#structure" className="list-group-item">Структура</a>
				        <a href="#view" className="list-group-item">Отображение</a>
				    </div>
				    <div id="app"></div>
				</div>
			</div>
		);
	}
});

module.exports = BasicView;