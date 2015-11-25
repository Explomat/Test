var React = require('react');
var Hasher = require('../utils/Hasher');
var ArrayUtils = require('../utils/Array');
var QuestionValidation = require('../utils/validation/QuestionValidation');
var QuestionStore = require('../stores/QuestionStore');
var AnswersStore = require('../stores/AnswersStore');
var QuestionActions = require('../actions/QuestionActions');
var AnswerActions = require('../actions/AnswerActions');
var QuestionTypes = require('../utils/QuestionTypes');
var Answer = require('./AnswersView');
var DropDown = require('./modules/DropDown');
var Txt = require('./modules/TextLabel');
var ImageSelect = require('./modules/ImageSelect');
var ModalView = require('./modules/ModalView');

function getQuestionState() {
	return QuestionStore.getQuestion();
}

var AddAnswerButton = React.createClass({

	handleAddAnswer: function() {
		AnswerActions.addAnswer();
	},

	render: function() {
		
		return (
			<button type="button" className="question-modal__add-answer btn btn-primary btn-sm" onClick={this.handleAddAnswer}>
				<span className="glyphicon glyphicon-plus"></span>
				<span>&nbsp;Добавить ответ</span>
			</button>
		);
	}
});

/*var QuestionImage = React.createClass({

	uploadImage: function(eventTarget) {
		QuestionActions.uploadImage(eventTarget);
	},

	removeImage: function (img) {
		QuestionActions.removeImage(img);
	},

	render:function() {
		return (
			<ImageSelect img={QuestionStore.getImg()} uploadImage={this.uploadImage} removeImage={this.removeImage}/>
		);
	}
});*/

var QuestionText = React.createClass({

	handleChange: function(val) {
		QuestionActions.changeText(val);
	},

	render: function() {
		return (
			<div className="question-modal__text">
				<Txt.TextAreaView value={this.props.text} onBlur={this.handleChange} placeholder='Введите вопрос' />
			</div>
		);
	}
});

var QuestionWeight = React.createClass({

	handleChange: function(val) {
		QuestionActions.changeWeight(val);
	},

	render: function() {
		return (
			<div className="question-modal__weight">
				<Txt.TextView value={this.props.weight} onBlur={this.handleChange} isValid={QuestionValidation.isValidWeight} placeholder='Вес' />
			</div>
		);
	}
});

var QuestionType = React.createClass({

	handleChange: function(e, payload, text){
		QuestionActions.selectType(payload);
	},

	render: function() {
		var qTypeValues = ArrayUtils.objectToArray(QuestionTypes.values);
		qTypeValues = qTypeValues.map(function(qType){
			var types = Object.keys(qType).map(function(q){
				return { 'payload': q, 'text': qType[q] }
			});
			return types[0];
		});
		return (
			<div className="question-modal__type">
				<DropDown items={qTypeValues} deviders={[2, 4]} selectedPayload={this.props.type} onChange={this.handleChange} />
			</div>
		);
	}
});


var QuestionView = React.createClass({

    getInitialState: function () {
		return getQuestionState();
	},

	componentDidMount: function() {
		QuestionStore.addChangeListener(this._onChange);
		AnswersStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		QuestionStore.removeChangeListener(this._onChange);
		AnswersStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getQuestionState());
	},

	handleClose: function(){
		QuestionStore.removeChangeListener(this._onChange);
		AnswersStore.removeChangeListener(this._onChange);
		Hasher.setHash('structure/false');
	},

	handleSaveQuestion: function(){
		QuestionStore.removeChangeListener(this._onChange);
		AnswersStore.removeChangeListener(this._onChange);
		if (this.props.sectionUuid){
			QuestionActions.saveQuestion(QuestionStore.getQuestion(), this.props.sectionUuid);
			Hasher.setHash('structure/false');
		}
	},

	render: function () {
		var answers = [];
		var qType = QuestionStore.getTypeSelected();
		this.state.answers.forEach(function(ans, i){
			var answer = null;
			if (qType == QuestionTypes.keys.multiple_choice || qType == QuestionTypes.keys.multiple_response)
				answer = <Answer.ChoiceAnswer uuid={ans.uuid} key={ans.uuid} selected={ans.selected} number={i+1} text={ans.text} weight={ans.weight}/>;
			else if (qType == QuestionTypes.keys.order)
				answer = <Answer.OrderAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight}/>;
			else if (qType == QuestionTypes.keys.match_item)
				answer = <Answer.MatchItemAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight} height={ans.height} width={ans.width}/>;
			else if (qType == QuestionTypes.keys.numerical_fill_in_blank)
				answer = <Answer.NumericalFillAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight} height={ans.height} width={ans.width}/>;
			else if (qType == QuestionTypes.keys.gap_fill)
				answer = <Answer.ConformityAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight}/>;
			if (answer)
				answers.push(answer);
		});

		return (
			<ModalView.ModalBox positionX={this.props.positionX} positionY={this.props.positionY}>
				<ModalView.ModalBoxContent>
					<ModalView.ModalBoxHeader onClose={this.handleClose}>
						<h4 className="modal-box__title">Добавление/Редактирование вопроса</h4>
					</ModalView.ModalBoxHeader>
					<ModalView.ModalBoxBody>
						<div className="question-modal__controls">
							<QuestionText text={this.state.text} />
							<QuestionType type={this.state.type} />
							<QuestionWeight weight={this.state.weight}/>
							<AddAnswerButton />
						</div>
				        <div className="answers">
				        	{answers}
				        </div>
					</ModalView.ModalBoxBody>
					<ModalView.ModalBoxFooter onSave={this.handleSaveQuestion} />
				</ModalView.ModalBoxContent>
			</ModalView.ModalBox>
		);
	}	
});

module.exports = QuestionView;