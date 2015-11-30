var React = require('react');
var TextView = require('./modules/TextLabel').TextView;
var TextAreaView = require('./modules/TextLabel').TextAreaView;
var CheckBox = require('./modules/CheckBox');
var ImageSelect = require('./modules/ImageSelect');
var Drop = require('./modules/DropInfo');
var AnswerActions = require('../actions/AnswerActions');
var AnswersStore = require('../stores/AnswersStore');
var AnswerValidation = require('../utils/validation/AnswerValidation');
var Conditions = require('./modules/Conditions').Conditions;
var ConditionsText = require('./modules/Conditions').ConditionsText;
var Conformities = require('./modules/Conformities');

var Answer = {

	getDefaultProps: function(){
		return {
			expanded: false
		}
	},

	uploadImage: function(eventTarget) {
		AnswerActions.uploadImage(this.props.uuid, eventTarget);
	},

	removeImage: function (img) {
		AnswerActions.removeImage(this.props.uuid, img);
	},

	getIcons: function(){
		var answersCount = AnswersStore.getAnswersCount();
		var isShowRemove = { display: answersCount === 1 ? 'none' : 'block' }
		return (
			<div className="answer__icons">
				<span onClick={this.remove} style={isShowRemove} className="glyphicon glyphicon-trash"></span>
			</div>
		);
	},

	handleExpand: function(isExpanded){
		AnswerActions.toogleExpand(this.props.uuid, isExpanded);
	},

	/*getIcons: function(){
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
	},*/

	getBasicFields: function(){
		/*<ImageSelect img={AnswersStore.getAnswerImg(this.props.uuid)} uploadImage={this.uploadImage} removeImage={this.removeImage}/>*/
		return (
			<div className="answer__base-fields">
				<TextView value={this.props.weight} onBlur={this.changeWeight} isValid={AnswerValidation.isValidWeight} placeholder="Вес"/>
				<TextView value={this.props.text} onBlur={this.changeText} placeholder="Ответ"/>
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
			<div className="answer all clearfix">
				<span className="answer__number">{this.props.number}</span>
				<TextView className={"answer__weight"} value={this.props.weight} onBlur={this.changeWeight} isValid={AnswerValidation.isValidWeight} placeholder="Вес"/>
				<TextView className={"answer__text"} value={this.props.text} onBlur={this.changeText} placeholder="Ответ"/>
				<TextView value={this.props.height} onBlur={this.changeHeight} isValid={AnswerValidation.isValidHeight} placeholder="Высота"/>
				<TextView value={this.props.width} onBlur={this.changeWidth} isValid={AnswerValidation.isValidWidth} placeholder="Ширина"/>
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

	mixins: [Answer],

	getDescriptionMarkup: function(){
		var text = this.props.text === '' ? 'Не указан текст ответа' : this.props.text;
		var textClassName = this.props.text === '' ? 'dropinfo__block-markup_empty': '';
		return (<span title={text} className={"dropinfo__block-markup " + textClassName}>{text}</span>);
	},

	render: function() {
		var descriptionMarkup = this.getDescriptionMarkup();
		return (
			<div className="answer all clearfix">
				<span className="answer__number">{this.props.number}</span>
				<div className="answer__content">
					<Drop.DropInfo onExpand={this.handleExpand} descriptionMarkup={descriptionMarkup} expanded={this.props.expanded}>
						<Drop.DropInfoHeader>
							{this.getIcons()}
						</Drop.DropInfoHeader>
						<Drop.DropInfoBody>
							<TextView className={"answer__weight"} value={this.props.weight} onBlur={this.changeWeight} isValid={AnswerValidation.isValidWeight} placeholder="Вес"/>
							<TextView className={"answer__text"} value={this.props.text} onBlur={this.changeText} placeholder="Ответ"/>
							<div className="a-conditions">
								<Conformities uuid={this.props.uuid} conformities={AnswersStore.getConformities(this.props.uuid)} />
							</div>
						</Drop.DropInfoBody>
					</Drop.DropInfo>
				</div>
			</div>
		);
	}
});

//единственный, множественный выбор
var ChoiceAnswer = React.createClass({

	mixins:[Answer],

	handleSelect: function(checked){
		AnswerActions.selectAnswer(this.props.uuid, checked);
	},

	getDescriptionMarkup: function(){
		var text = this.props.text === '' ? 'Не указан текст ответа' : this.props.text;
		var textClassName = this.props.text === '' ? 'dropinfo__block-markup_empty': '';
		return <span title={text} className={"dropinfo__block-markup " + textClassName}>{text}</span>
	},	

	render: function() {
		var isSelectedClass = this.props.selected ? 'dropinfo__block_selected' : '';
		var isSelectedClassHeader = this.props.selected ? 'dropinfo__content-header_selected': '';
		var descriptionMarkup = this.getDescriptionMarkup();
		return(
			<div className="answer all clearfix">
				<span className="answer__number">{this.props.number}</span>
				<div className="answer__content">
					<Drop.DropInfo onExpand={this.handleExpand} descriptionMarkup={descriptionMarkup} classNameBlock={isSelectedClass} expanded={this.props.expanded}>
						<Drop.DropInfoHeader className={isSelectedClassHeader}>
							<CheckBox className={"answer__checkbox"} label={"Правильный ответ"} checked={this.props.selected} onChangeChecked={this.handleSelect}/>
							{this.getIcons()}
						</Drop.DropInfoHeader>
						<Drop.DropInfoBody>
							<TextView className={"answer__weight"} value={this.props.weight} onBlur={this.changeWeight} isValid={AnswerValidation.isValidWeight} placeholder="Вес"/>
							<TextView className={"answer__text"} value={this.props.text} onBlur={this.changeText} placeholder="Ответ"/>
						</Drop.DropInfoBody>
					</Drop.DropInfo>
				</div>
			</div>
		);
	}
});

//ранжирование
var OrderAnswer = React.createClass({

	mixins:[Answer],

	getDescriptionMarkup: function(){
		var text = this.props.text === '' ? 'Не указан текст ответа' : this.props.text;
		var textClassName = this.props.text === '' ? 'dropinfo__block-markup_empty': '';
		return <span title={text} className={"dropinfo__block-markup " + textClassName}>{text}</span>
	},

	render: function() {
		var descriptionMarkup = this.getDescriptionMarkup();
		return(
			<div className="answer all clearfix">
				<span className="answer__number">{this.props.number}</span>
				<div className="answer__content">
					<Drop.DropInfo onExpand={this.handleExpand} descriptionMarkup={descriptionMarkup} expanded={this.props.expanded}>
						<Drop.DropInfoHeader>
							{this.getIcons()}
						</Drop.DropInfoHeader>
						<Drop.DropInfoBody>
							<TextView className={"answer__weight"} value={this.props.weight} onBlur={this.changeWeight} isValid={AnswerValidation.isValidWeight} placeholder="Вес"/>
							<TextView className={"answer__text"} value={this.props.text} onBlur={this.changeText} placeholder="Ответ"/>
						</Drop.DropInfoBody>
					</Drop.DropInfo>
				</div>
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