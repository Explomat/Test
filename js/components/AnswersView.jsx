var React = require('react');
var TextView = require('./modules/TextLabel').TextView;
var TextAreaView = require('./modules/TextLabel').TextAreaView;
var CheckBox = require('./modules/CheckBox');
var Drop = require('./modules/DropInfo');
var AnswerActions = require('../actions/AnswerActions');
var AnswersStore = require('../stores/AnswersStore');
var AnswerValidation = require('../utils/validation/AnswerValidation');
var Conditions = require('./modules/Conditions').Conditions;
var ConditionsText = require('./modules/Conditions').ConditionsText;

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

	getDescriptionMarkup: function(){
		var text = this.props.text === '' ? 'Не указано пояснение' : this.props.text;
		var textClassName = this.props.text === '' ? 'markup-block_empty': '';
		return (
			<div title={text} className={"markup-block " + textClassName}>
				{text}
			</div>
		);
	},

	getMark: function(condition){
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
							<TextView className={"answer__text"} value={this.props.text} onBlur={this.changeText} placeholder="Пояснение"/>
							<div className="answer__condition">{condition}</div>
						</Drop.DropInfoBody>
					</Drop.DropInfo>
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
			this.getMark(<ConditionsText uuid={this.props.uuid} condition={this.props.conditionText} />)
		);
	}
});


//цифровой ввод
var MatchItemAnswer = React.createClass({

	mixins:[Answer, FillAnswer],

	render: function() { 
		return(
			this.getMark(<Conditions uuid={this.props.uuid} condition={this.props.condition} />)
		);
	}
});

//соответствие
var ConformityAnswer = React.createClass({

	mixins: [Answer],

	getDescriptionMarkup: function(){
		var text = this.props.text === '' ? 'Не указан текст ответа' : this.props.text;
		var textClassName = this.props.text === '' ? 'markup-block_empty': '';
		var showStyles = { display : this.props.text !== '' ? 'inline-block' : 'none' };
		return (
			<div title={text} className={"markup-block " + textClassName}>
				<span className="markup-block__text">{text}</span>
				<div style={showStyles} className="markup-block__hide-block">
					<span className="markup-block__arrow glyphicon glyphicon-arrow-right"></span>
					<span className="markup-block__conformity">{this.props.conformity}</span>
				</div>
			</div>
		);
	},

	handleChangeConformity: function(val){
		AnswerActions.changeAnswerConformity(this.props.uuid, val);
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
							<TextView className={"answer__conformity"} value={this.props.conformity} onBlur={this.handleChangeConformity} placeholder="Соответствие"/>
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
		var textClassName = this.props.text === '' ? 'markup-block_empty': '';
		return <div title={text} className={"markup-block " + textClassName}>{text}</div>
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
		var textClassName = this.props.text === '' ? 'markup-block_empty': '';
		return <div title={text} className={"markup-block " + textClassName}>{text}</div>
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