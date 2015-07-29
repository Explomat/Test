var React = require('react');
var AnswerActions = require('../../actions/AnswerActions');
var SubAnswer = require('../../utils/SubAnswer');
var TextView = require('./Text').TextView;
var Validation = require('../../utils/Validation');

var ConditionTypeText = React.createClass({
	
	handleSelect: function() {
		if (this.props.handleSelect)
			this.props.handleSelect(this.props.type);
	},

	render: function() {
		return(
			<li onClick={this.handleSelect}><span>{SubAnswer.conditionsText.values[this.props.type]}</span></li>
		);
	}
});

var ConditionType = React.createClass({
	
	handleSelect: function() {
		if (this.props.handleSelect)
			this.props.handleSelect(this.props.type);
	},

	render: function() {
		return(
			<li onClick={this.handleSelect}><span>{SubAnswer.conditions.values[this.props.type]}</span></li>
		);
	}
});

var Condition = {

	componentWillUnmount: function() {
		document.removeEventListener('click', this.handleBlur);
	},

	componentDidMount: function() {
		document.addEventListener('click', this.handleBlur);
	},

	handleBlur: function () {
		if (this.state.display === true)
			this.setState({display: false});
	},

	handleDisplay: function(e) {
		if (e){
			e.stopPropagation();
    		e.nativeEvent.stopImmediatePropagation();
		}
		this.setState({display: !this.state.display});
	},

	handleSelect:function (type) {
		if (this.props.handleSelect)
			this.props.handleSelect(this.props.uuid, type);
	},

	handleRemove: function(){
		if (this.props.handleRemove)
			this.props.handleRemove(this.props.uuid);
	},

	handleChangeText: function(val) {
		if (this.props.handleChangeText)
			this.props.handleChangeText(this.props.uuid, val);
	},

	getConditionsType: function(){
		var list = [];
		Object.keys(SubAnswer.conditions.keys).forEach(function(c){
			list.push(<ConditionType key={this.props.uuid + c} type={c} handleSelect={this.handleSelect}/>);
		}.bind(this));
		return list;
	},

	getConditionsTypeText: function(){
		var list = [];
		Object.keys(SubAnswer.conditionsText.keys).forEach(function(c){
			list.push(<ConditionTypeText key={this.props.uuid + c} type={c} handleSelect={this.handleSelect}/>);
		}.bind(this));
		return list;
	},

	getMark: function(conditions, type, validate){
		var isDisplayStyle = { display: this.state.display ? "block" : "none" };
		return(
			<div className="input-group input-group-sm">
				<div className="input-group-btn">
					<button className="btn btn-default dropdown-toggle c-btn" type="button" onClick={this.handleDisplay}>
						<span>{type}&nbsp;&nbsp;</span>
						<span className="caret"></span>
					</button>
					<ul className="dropdown-menu" style={isDisplayStyle}>
						{conditions}
					</ul>
				</div>
				<TextView value={this.props.text} onBlur={this.handleChangeText} isValid={validate}/>
				
				<div className="input-group-btn">
					<button type="button" className="btn btn-default" onClick={this.handleRemove}>
					  <span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>
			</div>
		);
	},

	getInitialState: function() {
		return {
			display: false
		}
	}
}

var ConditionText = React.createClass({

	mixins: [Condition],

	render: function() {
		return(
			this.getMark(this.getConditionsTypeText(), SubAnswer.conditionsText.values[this.props.type])
		);
	}
});

var ConditionNumber = React.createClass({

	mixins: [Condition],

	render: function() {
		return(
			this.getMark(this.getConditionsType(), SubAnswer.conditions.values[this.props.type], Validation.isNumber)
		);
	}
});

var BaseConditions = {

	getConditions: function() {
		return this.props.conditions.map(function(c){
			return <ConditionNumber key={c.uuid} uuid={c.uuid} type={c.condition} text={c.text} handleSelect={this.handleSelect} handleRemove={this.handleRemove} handleChangeText={this.handleChangeText}/>;
		}.bind(this));
	},

	getConditionsText: function() {
		return this.props.conditions.map(function(c){
			return <ConditionText key={c.uuid} uuid={c.uuid} type={c.condition} text={c.text} handleSelect={this.handleSelect} handleRemove={this.handleRemove} handleChangeText={this.handleChangeText}/>;
		}.bind(this));
	},

	getMark: function(conditions, descr) {
		return (
			<div className="conditions">
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleAdd}>
					<span className="glyphicon glyphicon-plus"></span>
					<span>&nbsp;Добавить условие</span>
				</button>
				{conditions}
			</div>
		);
	}
}

var ConditionsText = React.createClass({

	mixins: [BaseConditions],

	handleSelect: function(conditionUuid, type) {
		AnswerActions.changeAnswerConditionText(this.props.uuid, conditionUuid, null, type);
	},

	handleAdd: function () {
		AnswerActions.addAnswerConditionText(this.props.uuid);
	},

	handleRemove: function(conditionUuid) {
		AnswerActions.removeAnswerConditionText(this.props.uuid, conditionUuid);
	},

	handleChangeText: function(conditionUuid, text) {
		AnswerActions.changeAnswerConditionText(this.props.uuid, conditionUuid, text);
	},

	render: function() {
		return (
			this.getMark(this.getConditionsText())
		);
	}
});

var Conditions = React.createClass({

	mixins: [BaseConditions],

	handleSelect: function(uuid, type) {
		AnswerActions.changeAnswerCondition(this.props.uuid, uuid, null, type);
	},

	handleAdd: function () {
		AnswerActions.addAnswerCondition(this.props.uuid);
	},

	handleRemove: function(conditionUuid){
		AnswerActions.removeAnswerCondition(this.props.uuid, conditionUuid);
	},

	handleChangeText: function(conditionUuid, text){
		AnswerActions.changeAnswerCondition(this.props.uuid, conditionUuid, text);
	},

	render: function() {
		return (
			this.getMark(this.getConditions())
		);
	}
});

module.exports = {
	Conditions: Conditions,
	ConditionsText: ConditionsText
}