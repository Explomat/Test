var React = require('react');
var Hasher = require('../utils/Hasher');
var ArrayUtils = require('../utils/Array');
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
	return {
		title: QuestionStore.getTitle(),
		text: QuestionStore.getText(),
		answers: AnswersStore.getAnswers(),
		type: QuestionStore.getTypeSelected()
	};
}

var Menu = React.createClass({

	handleAddAnswer: function() {
		AnswerActions.addAnswer();
	},

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
			<div className="menu-question-box col-lg-12">
				<div className="col-lg-6">
					<button type="button" className="btn btn-default btn-sm" onClick={this.handleAddAnswer}>
						<span className="glyphicon glyphicon-plus"></span>
						<span>&nbsp;Добавить ответ</span>
					</button>
				</div>
				<div className="col-lg-6">
					<DropDown items={qTypeValues} deviders={[2, 5]} selectedPayload={this.props.type} onChange={this.handleChange} />
				</div>
			</div>
		);
	}
});

var QuestionImage = React.createClass({

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
});

var QuestionText = React.createClass({

	handleChange: function(val) {
		QuestionActions.changeText(val);
	},

	render:function() {
		return (
			<div className="form-group">
				<Txt.TextAreaView value={this.props.text} onBlur={this.handleChange} placeholder='Введите вопрос' />
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
						<h4 className="modal-box__title">Добавьте вопрос</h4>
					</ModalView.ModalBoxHeader>
					<ModalView.ModalBoxBody>
				        <QuestionText text={this.state.text} />
				        <QuestionImage />
				        <Menu type={this.state.type}/>
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