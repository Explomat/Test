var React = require('react');
var AnswerActions = require('../../actions/AnswerActions');
var TextView = require('./Text').TextView;

var Conformity = React.createClass({

	handleChangeText: function (val) {
		if (this.props.handleChangeText)
			this.props.handleChangeText(this.props.uuid, val);
	},

	handleRemove: function (e) {
		if (this.props.handleRemove)
			this.props.handleRemove(this.props.uuid);
	},

	render: function() {
		return (
			<div className="input-group input-group-sm">
				<TextView value={this.props.text} onBlur={this.handleChangeText}/>
				<div className="input-group-btn">
					<button type="button" className="btn btn-default" onClick={this.handleRemove}>
					  <span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>
			</div>
		);
	}
});

var Conformities = React.createClass({

	handleAdd: function () {
		AnswerActions.addAnswerConformity(this.props.uuid);
	},

	handleRemove: function(conditionUuid){
		AnswerActions.removeAnswerConformity(this.props.uuid, conditionUuid);
	},

	handleChangeText: function(conditionUuid, text){
		AnswerActions.changeAnswerConformity(this.props.uuid, conditionUuid, text);
	},

	render: function() {
		return (
			<div className="conditions">
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleAdd}>
					<span className="glyphicon glyphicon-plus"></span>
					<span>&nbsp;Добавить соответствие</span>
				</button>
				{this.props.conformities.map(function(c){
					return <Conformity key={c.uuid} uuid={c.uuid} type={c.condition} text={c.text} handleRemove={this.handleRemove} handleChangeText={this.handleChangeText}/>;
				}.bind(this))}
			</div>
		);
	}
});

module.exports = Conformities;