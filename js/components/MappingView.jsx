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
		var isCorrectClass = this.props.selected ? 'mquestion__answer_correct' : '';
		return(
			<div className={isCorrectClass + " mquestion__answer"}>
				<input className="mquestion__answer-type-control" type="radio" checked={this.props.selected} disabled />
				<span>{this.props.text}</span>
				<span className="mquestion__answer-weight">{this.props.weight}</span>
			</div>
		);
	}
});

//множественный выбор
var MultipleResponceAnswerView = React.createClass({

	render: function(){
		var isCorrectClass = this.props.selected ? 'mquestion__answer_correct' : '';
		return(
			<div className={isCorrectClass + " mquestion__answer"}>
				<input className="mquestion__answer-type-control" type="checkbox" checked={this.props.selected} disabled />
				<span>{this.props.text}</span>
				<span className="mquestion__answer-weight">{this.props.weight}</span>
			</div>
		);
	}
});

//ранжирование
var OrderAnswerView = React.createClass({

	render: function(){	
		return(
			<div className="mquestion__answer">
				<span>{this.props.number}. </span>
				<span>{this.props.text}</span>
				<span className="mquestion__answer-weight">{this.props.weight}</span>
			</div>
		);
	}
});

//Цифровой ввод
var MatchAnswerView = React.createClass({

	render: function(){
		var condition = this.props.conditions[0];
		var isCorrectClass = EvaluateConditions.evalCondition(this.props.text, condition.text, condition.condition) ? 'mquestion__answer_correct' : '';
		return(
			<div className={isCorrectClass + " mquestion__answer"}>
				<label>Ответ: <span>{this.props.text}</span></label><br/>
				<label>Условие : <span>{this.props.conditions[0].text}</span></label><br/>
				<span className="mquestion__answer-weight">{this.props.weight}</span>
			</div>
		);
	}
});

//Текстовый ввод
var NumericalFillAnswerView = React.createClass({

	render: function(){
		var conditionText = this.props.conditionsText[0];
		var isCorrectClass = EvaluateConditions.evalConditionText(this.props.text, conditionText.text, conditionText.condition) ? 'mquestion__answer_correct' : '';
		return(
			<div className={isCorrectClass + " mquestion__answer"}>
				<label>Ответ: <span>{this.props.text}</span></label><br/>
				<label>Условие {SubAnswer.conditions.values[conditionText.condition]}<span>{conditionText.text}</span></label><br/>
				<span className="mquestion__answer-weight">{this.props.weight}</span>
			</div>
		);
	}
});

//Соответствие
var GapFillAnswerView = React.createClass({

	render: function(){
		var conformity = this.props.conformities[0];
		return(
			<div className="mquestion__answer">
				<label>Ответ: <span>{this.props.text}</span></label><br/>
				<label>Соответствие :<span>{conformity.text}</span></label><br/>
				<span className="mquestion__answer-weight">{this.props.weight}</span>
			</div>
		);
	}
});

var QuestionView = React.createClass({

	getWeight: function(){
		var weight = 0;
		for (var i = this.props.answers.length - 1; i >= 0; i--) {
			weight += Number(this.props.answers[i].weight);
		};
		return weight;
	},

	render: function(){
		return(
			<section className="mquestion">
				<h3 className="mquestion__title">
					<span className="mquestion__title-number">{this.props.number}</span> 
					<span>{this.props.text}</span>
				</h3>
				<main className="mquestion__answers-box">
					{this.props.answers.map(function(a, index){
						switch(this.props.type){
							case QuestionTypes.keys.multiple_choice:
								return <MultipleChoiceAnswerView key={a.uuid} {...a} number={index + 1} />
							case QuestionTypes.keys.multiple_response:
								return <MultipleResponceAnswerView key={a.uuid} {...a} number={index + 1} />
							case QuestionTypes.keys.order:
								return <OrderAnswerView key={a.uuid} {...a} number={index + 1} />
							case QuestionTypes.keys.match_item:
								return <MatchAnswerView key={a.uuid} {...a} number={index + 1} />
							case QuestionTypes.keys.numerical_fill_in_blank:
								return <NumericalFillAnswerView key={a.uuid} {...a} number={index + 1} />
							case QuestionTypes.keys.gap_fill:
								return <GapFillAnswerView key={a.uuid} {...a} number={index + 1} />
						}
					}.bind(this))}
				</main>
				<footer className="mquestion__footer">
					<p className="mquestion__info">
						<span className="mquestion__info-title">Тип вопроса: </span>
						<span className="mquestion__info-type">{QuestionTypes.values[this.props.type]}</span>
						<span className="mquestion__info-title">Вес вопроса: </span>
						<span className="mquestion__info-score">{this.getWeight()}</span>
					</p>
				</footer>
			</section>
		);
	}
});

var SectionView = React.createClass({

	render: function(){
		return(
			<div className="group__elem mapping__section">
				<span className="mapping__section-title">{this.props.title}</span>
				{this.props.questions.map(function(q, index){
					return <QuestionView key={q.uuid} {...q} number={index + 1}/>
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
				<div className="mapping__content">
					{this.state.structure.sections.map(function(s){
						return <SectionView key={s.uuid} title={s.title} questions={s.questions}/>
					}.bind(this))}
				</div>
			</div>
		);
	}
});

module.exports = MappingView;