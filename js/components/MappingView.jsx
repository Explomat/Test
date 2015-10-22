var React = require('react');
var MappingStore = require('../stores/MappingStore');
var MappingActions = require('../actions/SectionActions');
var QuestionTypes = require('../utils/QuestionTypes');
var SubAnswer = require('../utils/SubAnswer');
var EvaluateConditions = require('../utils/EvaluateConditions');

function getMappingState() {
	return {
		sections: MappingStore.getSections()
	};
}

//единственный выбор
var MultipleChoiceAnswerView = React.createClass({

	render: function(){
		var isCorrectClass = this.props.answer.selected ? 'mapping_right-choice' : '';
		return(
			<div className={isCorrectClass + " mapping_answer"}>
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
		var isCorrectClass = this.props.answer.selected ? 'mapping_right-choice' : '';
		return(
			<div className={isCorrectClass + " mapping_answer"}>
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
			<div className="mapping_answer">
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
		var isCorrectClass = EvaluateConditions.evalCondition(this.props.answer.text, condition.text, condition.condition) ? 'mapping_right-choice' : '';
		return(
			<div className={isCorrectClass + " mapping_answer"}>
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
		var isCorrectClass = EvaluateConditions.evalConditionText(this.props.answer.text, conditionText.text, conditionText.condition) ? 'mapping_right-choice' : '';
		return(
			<div className={isCorrectClass + " mapping_answer"}>
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
			<div className="mapping_answer">
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
			<div className="mapping_question">
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
			<div className="mapping_section">
				<span>{this.props.title}</span>
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
		return (
			<div className={"panel panel-default tests__body-content tests__body-content_translate" + classes}>
				<div className="panel-body">
					{this.state.sections.map(function(s){
						return <SectionView key={s.uuid} title={s.title} questions={s.questions}/>
					}.bind(this))}
				</div>
			</div>
		);
	}
});

module.exports = MappingView;