var React = require('react');
var TextView = require('./modules/Text').TextView;
var TextAreaView = require('./modules/Text').TextAreaView;
var ImageSelect = require('./modules/ImageSelect');
var AnswerActions = require('../actions/AnswerActions');
var AnswersStore = require('../stores/AnswersStore');
var Validation = require('../utils/Validation');
var Conditions = require('./modules/Conditions').Conditions;
var ConditionsText = require('./modules/Conditions').ConditionsText;
var Conformities = require('./modules/Conformities');

var Answer = {

	uploadImage: function(eventTarget) {
		AnswerActions.uploadImage(this.props.uuid, eventTarget);
	},

	removeImage: function (img) {
		AnswerActions.removeImage(this.props.uuid, img);
	},

	getIcons: function(){
		var answersCount = AnswersStore.getAnswersCount();
		var answerIndex = AnswersStore.getAnswerIndex(this.props.uuid);
		var isShowArrowUp = { display: answerIndex === 0 ? 'none' : 'block' };
		var isShowArrowDown = { display: answerIndex === answersCount - 1 ? 'none' : 'block' };
		var isShowRemove = { display: answersCount === 1 ? 'none' : 'block' }
		return (
			<div className="btn-group btn-group-xs pull-right">
				<button type="button" style={isShowArrowUp} className="btn btn-default" onClick={this.shiftUp}>
				  <span className="glyphicon glyphicon-arrow-up"></span>
				</button>
				<button type="button" style={isShowArrowDown} className="btn btn-default" onClick={this.shiftDown}>
				  <span className="glyphicon glyphicon-arrow-down"></span>
				</button>
				<button type="button" style={isShowRemove} className="btn btn-default" onClick={this.remove}>
				  <span className="glyphicon glyphicon-remove"></span>
				</button>
			</div>
		);
	},

	getBasicFields: function(){
		return (
			<div className="form-group">
				<label>Ответ : *</label>
				<TextAreaView rows="1" value={this.props.text} onBlur={this.changeText} />
				<ImageSelect img={AnswersStore.getAnswerImg(this.props.uuid)} uploadImage={this.uploadImage} removeImage={this.removeImage}/>
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