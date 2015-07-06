var React = require('react');
var TextView = require('./Components/Text').TextView;
var TextAreaView = require('./Components/Text').TextAreaView;
var ImageSelect = require('./Components/ImageSelect');
var AnswerActions = require('../Controllers/startController/actions/AnswerActions');
var QuestionStore = require('../Controllers/startController/stores/QuestionStore');
var AnswersStore = require('../Controllers/startController/stores/AnswersStore');
var SubAnswer = require('../Controllers/startController/utils/SubAnswer');
var Validation = require('../utils/Validation');


var Answer = {

	changeImg: function(img) {
		AnswerActions.changeAnswerImg(this.props.uuid, img);
	},

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
				<TextAreaView className="form-control" rows="1" value={this.props.text} onBlur={this.changeText} />
				<ImageSelect img={AnswersStore.getAnswerImg(this.props.uuid)} changeImg={this.changeImg}/>
				<label>
					<span>Вес :</span>
					<TextView value={this.props.weight} onBlur={this.changeWeight} isValid={Validation.isNumberOrReal}/>
				</label>
			</div>
		);
	},

	shiftUp: function(){
		AnswerActions.shiftUpAnswer(this.props.uuid);
	},

	shiftDown: function(){
		AnswerActions.shiftDownAnswer(this.props.uuid);
	},

	changeText: function(val){
		AnswerActions.changeTextAnswer(this.props.uuid, val);
	},

	changeWeight: function(val){
		AnswerActions.changeWeightAnswer(this.props.uuid, val);
	},

	remove: function(){
		AnswerActions.removeAnswer(this.props.uuid);
	}
}

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

var Conformity = React.createClass({

	handleChangeText: function (e) {
		if (this.props.handleChangeText)
			this.props.handleChangeText(this.props.uuid, e.target.value);
	},

	handleRemove: function (e) {
		if (this.props.handleRemove)
			this.props.handleRemove(this.props.uuid);
	},

	render: function() {
		return (
			<div className="input-group input-group-sm">
				<input type="text" className="form-control" value={this.props.text} onChange={this.handleChangeText}/>
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


var FillAnswer = {

	changeHeight: function(val){
		AnswerActions.changeAnswerSize(this.props.uuid, null, val);
	},

	changeWidth: function(val){
		AnswerActions.changeAnswerSize(this.props.uuid, val, null);
	},

	getMark: function(conditions){
		return(
			<div className="all">
				{this.getIcons()}
				<label>
					<span>{this.props.number}&nbsp;</span>
				</label>
				{this.getBasicFields()}
				<label>
					<span>Высота</span>
					<TextView value={this.props.height} onBlur={this.changeHeight} isValid={Validation.isNumber}/>
				</label>
				<label>
					<span>Ширина</span>
					<TextView value={this.props.width} onBlur={this.changeWidth} isValid={Validation.isNumber}/>
				</label>
				<div className="a-conditions">
					{conditions}
				</div>
			</div>
		);
	}
}

//текстовый ввод
var NumericalFillAnswer = React.createClass({

	mixins: [Answer, FillAnswer],

	render: function() {
		return(
			this.getMark(<ConditionsText uuid={this.props.uuid} conditions={AnswersStore.getConditionsText(this.props.uuid)} />)
		);
	}
});


//цифровой ввод
var MatchItemAnswer = React.createClass({

	mixins:[Answer, FillAnswer],

	render: function() { 
		return(
			this.getMark(<Conditions uuid={this.props.uuid} conditions={AnswersStore.getConditions(this.props.uuid)} />)
		);
	}
});

//соответствие
var ConformityAnswer = React.createClass({

	mixins:[Answer],

	render: function() {
		return (
			<div className="all">
				{this.getIcons()}
				<label>
					<span>{this.props.number}&nbsp;</span>
				</label>
				{this.getBasicFields()}
				<div className="a-conditions">
					<Conformities uuid={this.props.uuid} conformities={AnswersStore.getConformities(this.props.uuid)} />
				</div>
			</div>
		);
	}
});

//единственный, множественный выбор
var ChoiceAnswer = React.createClass({

	mixins:[Answer],

	handleSelect: function(e){
		AnswerActions.selectAnswer(this.props.uuid, e.target.checked);
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

//ранжирование
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

module.exports = {
	ChoiceAnswer: ChoiceAnswer,
	OrderAnswer: OrderAnswer,
	MatchItemAnswer: MatchItemAnswer,
	NumericalFillAnswer: NumericalFillAnswer,
	ConformityAnswer: ConformityAnswer
}