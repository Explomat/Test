var React = require('react');
var QuestionActions = require('../Controllers/startController/actions/QuestionActions');
var QuestionStore = require('../Controllers/startController/stores/QuestionStore');
var SubAnswer = require('../Controllers/startController/utils/SubAnswer');
var CONDITION_DEFAULT = 'equal';

var SelectImage = React.createClass({
		
	handleChange:function(e) {
		//React.findDOMNode(this.refs.form).submit();
	},

	handleSubmit:function(e) {
		e.preventDefault();
		alert("submit");
		return;
	},

	render:function(){
		return (
			<form ecntype="multipart/form-data" method="POST" onSubmit={this.handleSubmit} ref="form">
				<input type="file" className="file" onChange={this.handleChange} />
			</form>
		);	
	}
});

var Answer = {

	getIcons: function(){
		return (
			<div className="btn-group btn-group-xs pull-right">
				<button type="button" className="btn btn-default" onClick={this.shiftUp}>
				  <span className="glyphicon glyphicon-arrow-up"></span>
				</button>
				<button type="button" className="btn btn-default" onClick={this.shiftDown}>
				  <span className="glyphicon glyphicon-arrow-down"></span>
				</button>
				<button type="button" className="btn btn-default" onClick={this.remove}>
				  <span className="glyphicon glyphicon-remove"></span>
				</button>
			</div>
		);
	},

	getBasicFields: function(){
		return (
			<div className="form-group">
				<label>Ответ : *</label>
				<textarea className="form-control" rows="1" value={this.props.text} onChange={this.changeText}></textarea>
				<SelectImage />
				<label>
					<span>Вес :</span>
					<input className="form-control" type="text" value={this.props.weight} onChange={this.changeWeight}/>
				</label>
			</div>
		);
	},

	shiftUp: function(){
		QuestionActions.shiftUpAnswer(this.props.uuid);
	},

	shiftDown: function(){
		QuestionActions.shiftDownAnswer(this.props.uuid);
	},

	changeText: function(e){
		QuestionActions.changeTextAnswer(this.props.uuid, e.target.value);
	},

	changeWeight: function(e){
		QuestionActions.changeWeightAnswer(this.props.uuid, e.target.value);
	},

	remove: function(){
		QuestionActions.removeAnswer(this.props.uuid);
	}
}

var Condition = React.createClass({

	componentWillUnmount: function() {
		document.removeEventListener('click', this.handleBlur);
	},

	componentDidMount: function() {
		document.addEventListener('click', this.handleBlur);
	},

	handleBlur: function () {
		this.setState({display: false});
	},

	handleDisplay: function(e) {
		if (e){
			e.stopPropagation();
    		e.nativeEvent.stopImmediatePropagation();
		}
		this.setState({display: !this.state.display})
	},

	handleSelect:function () {
		if (this.props.handleSelect)
			this.props.handleSelect(this.props.uuid, this.props.type);
	},

	handleRemove: function(){
		if (this.props.handleRemove)
			this.props.handleRemove(this.props.uuid);
	},

	getInitialState: function() {
		return {
			display: false
		}
	},

	render: function() {
		var isDisplayStyle = { display: this.state.display ? "block" : "none" };
		var list = [];
		Object.keys(SubAnswer.conditions.keys).forEach(function(c){
			list.push(<li key={c}><span>{SubAnswer.conditions.values[c]}</span></li>);
		}.bind(this));

		return(
			<div className="input-group input-group-sm">
				<div className="input-group-btn">
					<button className="btn btn-default dropdown-toggle" type="button" onClick={this.handleDisplay}>
						<span>{SubAnswer.conditions.values[this.props.type]}&nbsp;&nbsp;</span>
						<span className="caret"></span>
					</button>
					<ul className="dropdown-menu" style={isDisplayStyle}>
						{list}
					</ul>
				</div>
				<input type="text" className="form-control" value={this.props.text} />
				<div className="input-group-btn">
					<button type="button" className="btn btn-default" onClick={this.handleRemove}>
					  <span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>
			</div>
		);
	}
});

var Conditions = React.createClass({

	handleSelect: function(uuid, type) {
		
	},

	handleClick: function () {
		QuestionActions.addAnswerCondidtion(this.props.uuid);
	},

	handleRemove: function(conditionUuid){
		QuestionActions.removeAnswerCondidtion(this.props.uuid, conditionUuid);
	},

	render: function() {
		var conditions = [];
		this.props.conditions.forEach(function(c){
			conditions.push(<Condition key={c.uuid} uuid={c.uuid} type={c.condition} text={c.text} handleSelect={this.handleSelect} handleRemove={this.handleRemove}/>);
		}.bind(this));
		return (
			<div className="conditions">
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleClick}>
					<span className="glyphicon glyphicon-plus"></span>
					<span>&nbsp;Добавить условие</span>
				</button>
				{conditions}
			</div>
		);
	}
});

var ChoiceAnswer = React.createClass({

	mixins:[Answer],

	handleSelect: function(e){
		QuestionActions.selectAnswer(this.props.uuid, e.target.checked);
	},

	render:function() {
		return(
			<div className="all">
				{this.getIcons()}
				<label>
					<span>{this.props.number}&nbsp;</span>
					<input type="checkbox" checked={this.props.selected} onChange={this.handleSelect}/>
				</label>
				{this.getBasicFields()}
			</div>
		);
	}
});

var OrderAnswer = React.createClass({

	mixins:[Answer],

	render:function() {
		return(
			<div className="all">
				{this.getIcons()}
				<label>
					<span>{this.props.number}&nbsp;</span>
				</label>
				{this.getBasicFields()}
			</div>
		);
	}
});

var MatchItemAnswer = React.createClass({

	mixins:[Answer],

	render:function() {
		return(
			<div className="all">
				{this.getIcons()}
				<label>
					<span>{this.props.number}&nbsp;</span>
				</label>
				{this.getBasicFields()}
				<label>
					<span>Высота</span>
					<input type="text" className="form-control" value={this.props.rowsCount} />
				</label>
				<label>
					<span>Ширина</span>
					<input type="text" className="form-control" value={this.props.colsCount} />
				</label>
				<div className="a-conditions">
					<Conditions type={CONDITION_DEFAULT} uuid={this.props.uuid} conditions={QuestionStore.getConditions(this.props.uuid)} />
				</div>
			</div>
		);
	}
});

module.exports = {
	ChoiceAnswer: ChoiceAnswer,
	OrderAnswer: OrderAnswer,
	MatchItemAnswer: MatchItemAnswer
}