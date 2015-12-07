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
var CheckBox = require('./modules/CheckBox');

function getQuestionState() {
	return {
		question: QuestionStore.getQuestion(),
		answers: AnswersStore.getAnswers()
	}
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
				<Txt.TextAreaView value={this.props.text} onBlur={this.handleChange} placeholder='Вопрос *' focused={true}/>
			</div>
		);
	}
});

var QuestionWeight = React.createClass({

	handleChange: function(val) {
		QuestionActions.changeWeight(val);
	},

	render: function() {
		var weightClassName = QuestionStore.isSelfWeight() === false ? '' : 'question-modal__weight_hide';
		return (
			<div className={"question-modal__weight " + weightClassName}>
				<Txt.TextView value={this.props.weight} onBlur={this.handleChange} isValid={QuestionValidation.isValidWeight} placeholder='Вес' />
			</div>
		);
	}
});

var QuestionSelfWeight = React.createClass({

	handleChange: function(checked) {
		QuestionActions.changeSelfWeight(checked);
	},

	render: function() {
		return (
			<div className="question-modal__self-weight">
				<CheckBox className={"answer__checkbox"} label={"Использовать собственный вес"} checked={this.props.useSelfWeight} onChangeChecked={this.handleChange}/>
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

	isDisableSave: function(){
		var qType = QuestionStore.getType();
		var isAddFieldFilled = true;
		if (qType === QuestionTypes.keys.gap_fill) {
			isAddFieldFilled = AnswersStore.isConformitiesFilled();
		}
		else if (qType === QuestionTypes.keys.numerical_fill_in_blank) {
			isAddFieldFilled = AnswersStore.isConditionsTextFilled();
		}
		else if (qType === QuestionTypes.keys.match_item){
			isAddFieldFilled = AnswersStore.isConditionsFilled();
		}
		else if (qType === QuestionTypes.keys.multiple_choice || qType ===  QuestionTypes.keys.multiple_response) {
			isAddFieldFilled = AnswersStore.isSomeAnswersSelected();
		}
		return !AnswersStore.isAnswersFilled() || QuestionStore.isEmptyText() || !isAddFieldFilled;
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
		var qType = QuestionStore.getType();
		this.state.answers.forEach(function(ans, i){
			var answer = null;
			if (qType === QuestionTypes.keys.multiple_choice || qType === QuestionTypes.keys.multiple_response)
				answer = <Answer.ChoiceAnswer uuid={ans.uuid} key={ans.uuid} selected={ans.selected} number={i+1} text={ans.text} weight={ans.weight} expanded={ans.expanded} focused={ans.focused}/>;
			else if (qType === QuestionTypes.keys.order)
				answer = <Answer.OrderAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight} expanded={ans.expanded} focused={ans.focused}/>;
			else if (qType === QuestionTypes.keys.gap_fill)
				answer = <Answer.ConformityAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight} conformity={ans.conformity} expanded={ans.expanded} focused={ans.focused}/>;
			else if (qType === QuestionTypes.keys.numerical_fill_in_blank)
				answer = <Answer.NumericalFillAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight} height={ans.height} width={ans.width} conditionText={ans.conditionText} expanded={ans.expanded} focused={ans.focused}/>;
			else if (qType === QuestionTypes.keys.match_item)
				answer = <Answer.MatchItemAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight} height={ans.height} width={ans.width} condition={ans.condition} expanded={ans.expanded} focused={ans.focused}/>;
			
			if (answer)
				answers.push(answer);
		});
		
		var isDisableSave = this.isDisableSave();
		var warningStyles = { display : qType === QuestionTypes.keys.order ? 'block' : 'none' };
		return (
			<ModalView.ModalBox positionX={this.props.positionX} positionY={this.props.positionY}>
				<ModalView.ModalBoxContent>
					<ModalView.ModalBoxHeader onClose={this.handleClose}>
						<h4 className="modal-box__title">Добавление/Редактирование вопроса</h4>
					</ModalView.ModalBoxHeader>
					<ModalView.ModalBoxBody>
						<div className="question-modal">
							<div className="question-modal__controls">
								<div className="question-modal__controls-input">
									<QuestionText text={this.state.question.text} />
									<QuestionType type={this.state.question.type} />
									<QuestionWeight weight={this.state.question.weight}/>
								</div>
								<div className="question-modal__controls-edit">
									<AddAnswerButton />
									<QuestionSelfWeight useSelfWeight={this.state.question.useSelfWeight} />
								</div>
							</div>
					        <div className="answers">
					        	<div style={warningStyles} className="answers__warning">
						        	<span className="answers__warning-icon glyphicon glyphicon-warning-sign"></span>
						        	<span className="answers__warning-text">Обратите внимание, что ответы на вопрос данного типа, необходимо распологать в правильном порядке, при проведении тестирования ответы будут перемешанны!</span>
					        	</div>
					        	{answers}
					        </div>
					    </div>
					</ModalView.ModalBoxBody>
					<ModalView.ModalBoxFooter onSave={this.handleSaveQuestion} disabled={isDisableSave}/>
				</ModalView.ModalBoxContent>
			</ModalView.ModalBox>
		);
	}	
});

module.exports = QuestionView;