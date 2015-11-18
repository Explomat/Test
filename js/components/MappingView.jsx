var React = require('react');
var MappingStore = require('../stores/MappingStore');
var MappingActions = require('../actions/SectionActions');
var QuestionTypes = require('../utils/QuestionTypes');
var SubAnswer = require('../utils/SubAnswer');
var EvaluateConditions = require('../utils/EvaluateConditions');

function getMappingState() {
	return MappingStore.getData();
}

//единственный выбор
var MultipleChoiceAnswerView = React.createClass({

	render: function(){
		var isCorrectClass = this.props.answer.selected ? 'mapping__answer_correct' : '';
		return(
			<div className={isCorrectClass + " mapping__answer"}>
				<span>{this.props.index}</span>
				<input type="radio" checked={this.props.answer.selected} disabled />
				<label>Ответ: <span>{this.props.answer.text}</span></label><br/>
				<label>Вес : <span>{this.props.answer.weight}</span></label>
			</div>
		);
	}
});

//множественный выбор
var MultipleResponceAnswerView = React.createClass({

	render: function(){
		var isCorrectClass = this.props.answer.selected ? 'mapping__answer_correct' : '';
		return(
			<div className={isCorrectClass + " mapping__answer"}>
				<span>{this.props.index}</span>
				<input type="checkbox" checked={this.props.answer.selected} disabled />
				<label>Ответ: <span>{this.props.answer.text}</span></label><br/>
				<label>Вес : <span>{this.props.answer.weight}</span></label>
			</div>
		);
	}
});

//ранжирование
var OrderAnswerView = React.createClass({

	render: function(){	
		return(
			<div className="mapping__answer">
				<span>{this.props.index}</span>
				<label>Ответ: <span>{this.props.answer.text}</span></label><br/>
				<label>Вес : <span>{this.props.answer.weight}</span></label>
			</div>
		);
	}
});

//Цифровой ввод
var MatchAnswerView = React.createClass({

	render: function(){
		var condition = this.props.answer.conditions[0];
		var isCorrectClass = EvaluateConditions.evalCondition(this.props.answer.text, condition.text, condition.condition) ? 'mapping__answer_correct' : '';
		return(
			<div className={isCorrectClass + " mapping__answer"}>
				<span>{this.props.index}</span>
				<label>Ответ: <span>{this.props.answer.text}</span></label><br/>
				<label>Условие : <span>{this.props.answer.conditions[0].text}</span></label><br/>
				<label>Вес : <span>{this.props.answer.weight}</span></label>
			</div>
		);
	}
});

//Текстовый ввод
var NumericalFillAnswerView = React.createClass({

	render: function(){
		var conditionText = this.props.answer.conditionsText[0];
		var isCorrectClass = EvaluateConditions.evalConditionText(this.props.answer.text, conditionText.text, conditionText.condition) ? 'mapping__answer_correct' : '';
		return(
			<div className={isCorrectClass + " mapping__answer"}>
				<span>{this.props.index}</span>
				<label>Ответ: <span>{this.props.answer.text}</span></label><br/>
				<label>Условие {SubAnswer.conditions.values[conditionText.condition]}<span>{conditionText.text}</span></label><br/>
				<label>Вес : <span>{this.props.answer.weight}</span></label>
			</div>
		);
	}
});

//Соответствие
var GapFillAnswerView = React.createClass({

	render: function(){
		var conformity = this.props.answer.conformities[0];
		return(
			<div className="mapping__answer">
				<span>{this.props.index}</span>
				<label>Ответ: <span>{this.props.answer.text}</span></label><br/>
				<label>Соответствие :<span>{conformity.text}</span></label><br/>
				<label>Вес : <span>{this.props.answer.weight}</span></label>
			</div>
		);
	}
});

var QuestionView = React.createClass({
	render: function(){
		return(
			<div className="mapping__question">
				<div>{this.props.title}</div>
				<div>{this.props.text}</div>
				{this.props.answers.map(function(a, index){
					switch(this.props.type){
						case QuestionTypes.keys.multiple_choice:
							return <MultipleChoiceAnswerView key={a.uuid} answer={a} index={index + 1} />
						case QuestionTypes.keys.multiple_response:
							return <MultipleResponceAnswerView key={a.uuid} answer={a} index={index + 1} />
						case QuestionTypes.keys.order:
							return <OrderAnswerView key={a.uuid} answer={a} index={index + 1} />
						case QuestionTypes.keys.match_item:
							return <MatchAnswerView key={a.uuid} answer={a} index={index + 1} />
						case QuestionTypes.keys.numerical_fill_in_blank:
							return <NumericalFillAnswerView key={a.uuid} answer={a} index={index + 1} />
						case QuestionTypes.keys.gap_fill:
							return <GapFillAnswerView key={a.uuid} answer={a} index={index + 1} />
					}
				}.bind(this))}
			</div>
		);
	}
});

var SectionView = React.createClass({

	render: function(){
		return(
			<div className="mapping__section">
				<span className="mapping__section-title">{this.props.title}</span>
				{this.props.questions.map(function(q){
					return <QuestionView key={q.uuid} title={q.title} text={q.text} type={q.type} answers={q.answers} />
				})}
			</div>
		);
	}
});

var MappingView = React.createClass({

	toggle: function() {
        this.setState({isMounted: !this.state.isMounted});
    },

	componentDidMount: function() {
		MappingStore.addChangeListener(this._onChange);
		setTimeout(this.toggle, 0);
	},

	componentWillUnmount: function() {
		MappingStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getMappingState());
	},

	getInitialState: function () {
		var data = getMappingState();
		data.isMounted = false;
		return data;
	},

	render: function () {
		var classes = '';
        if (this.state.isMounted) {
            classes = ' tests__body-content_show';
        }
        var questionsCount = MappingStore.getQuestionsCount();
        var maxAttemptsCount = MappingStore.getMaxPassingScore();
		return (
			<div className={"mapping group tests__body-content tests__body-content_translate" + classes}>
				<div className="mapping__header group__elem">
					<h2 className="mapping__header-title">{this.state.settings.title}</h2>
					<p>
						<span>Количество вопросов: </span>
						<span>{questionsCount}</span>
					</p>
					<p>
						<span>Время тестирования(мин): </span>
						<span>{this.state.settings.durationMinutes}</span>
					</p>
					<p>
						<span>Максимально возможный балл: </span>
						<span>{maxAttemptsCount}</span>
					</p>
					<p>
						<span>Проходной балл: </span>
						<span>{this.state.settings.passingScore}</span>
					</p>
				</div>
				<div className="mapping__content group__elem">
					{this.state.structure.sections.map(function(s){
						return <SectionView key={s.uuid} title={s.title} questions={s.questions}/>
					}.bind(this))}
				</div>
			</div>
		);
	}
});

module.exports = MappingView;