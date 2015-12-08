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
		var isCorrectWeightClass = this.props.selected ? 'mquestion__answer-weight_correct' : '';
		return(
			<div className={isCorrectClass + " mquestion__answer"}>
				<input className="mquestion__answer-type-control" type="radio" checked={this.props.selected} disabled />
				<span>{this.props.text}</span>
				<span className={"mquestion__answer-weight " + isCorrectWeightClass}>{this.props.weight}</span>
			</div>
		);
	}
});

//множественный выбор
var MultipleResponceAnswerView = React.createClass({

	render: function(){
		var isCorrectClass = this.props.selected ? 'mquestion__answer_correct' : '';
		var isCorrectWeightClass = this.props.selected ? 'mquestion__answer-weight_correct' : '';
		return(
			<div className={isCorrectClass + " mquestion__answer"}>
				<input className="mquestion__answer-type-control" type="checkbox" checked={this.props.selected} disabled />
				<span>{this.props.text}</span>
				<span className={"mquestion__answer-weight " + isCorrectWeightClass}>{this.props.weight}</span>
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
		return(
			<div className="mquestion__answer">
				<span>{this.props.text}</span>
				<span className="mquestion__answer-weight">{this.props.weight}</span>
				<div className="mquestion__answer-description">
					<span className="mquestion__answer-condition">{SubAnswer.conditions.values[this.props.condition.condition]}</span>
					<span>  {this.props.condition.text}</span>
				</div>
			</div>
		);
	}
});

//Текстовый ввод
var NumericalFillAnswerView = React.createClass({

	render: function(){
		return(
			<div className="mquestion__answer">
				<span>{this.props.text}</span>
				<span className="mquestion__answer-weight">{this.props.weight}</span>
				<div className="mquestion__answer-description">
					<span className="mquestion__answer-condition">{SubAnswer.conditionsText.values[this.props.conditionText.condition]}</span>
					<span>  {this.props.conditionText.text}</span>
				</div>
			</div>
		);
	}
});

//Соответствие
var GapFillAnswerView = React.createClass({

	render: function(){
		return(
			<div className="mquestion__answer">
				<div className="mquestion__parallel mquestion__parallel_first">{this.props.text}</div>
				<div className="mquestion__parallel mquestion__parallel_second">{this.props.conformity}</div>
			</div>
		);
	}
});

var QuestionView = React.createClass({

	getQuestionWeight: function(){
		return MappingStore.getQuestionWeight(this.props.uuid);
	},

	render: function(){
		return(
			<section className="mquestion">
				<h4 className="mquestion__title">
					<span className="mquestion__title-number">{this.props.number}</span> 
					<span>{this.props.text}</span>
				</h4>
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
						<span  className="mquestion__info-type">
							<span className="mquestion__info-title">Тип: </span>
							<span>{QuestionTypes.values[this.props.type]}</span>
						</span>
						<span className="mquestion__info-score">
							<span className="mquestion__info-title">Вес: </span>
							<span>{this.getQuestionWeight()}</span>
						</span>
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
				<h3 className="mapping__section-title">{this.props.title}</h3>
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
			<div className={"mapping group tests__body-content tests__body-content_translate " + classes}>
				<div className="mapping__header group__elem">
					<h2 className="mapping__header-title">{this.state.settings.title}</h2>
					<p className="mapping__header-description">
						<span>Количество вопросов: </span>
						<span>{questionsCount}</span>
					</p>
					<p className="mapping__header-description">
						<span>Время тестирования(мин): </span>
						<span>{this.state.settings.durationMinutes}</span>
					</p>
					<p className="mapping__header-description">
						<span>Максимально возможный балл: </span>
						<span>{maxAttemptsCount}</span>
					</p>
					<p className="mapping__header-description">
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