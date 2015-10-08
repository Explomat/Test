var React = require('react');
var MappingStore = require('../stores/MappingStore');
var MappingActions = require('../actions/SectionActions');
var QuestionTypes = require('../utils/QuestionTypes');

function getMappingState() {
	return {
		sections: MappingStore.getSections()
	};
}

//единственный выбор
var MultipleChoiceAnswerView = React.createClass({

	render: function(){
		var isCorrectChoiceClass = this.props.answer.selected ? 'mapping_right-choice' : '';
		return(
			<div className={isCorrectChoiceClass + " mapping_answer"}>
				<span>{this.props.index}</span>
				<input type="radio" checked={this.props.answer.selected} disabled />
				<span>{this.props.answer.text}</span><br/>
				<label>Вес : <span>{this.props.answer.weight}</span></label>
			</div>
		);
	}
});

//множественный выбор
var MultipleResponceAnswerView = React.createClass({

	render: function(){
		var isCorrectChoiceClass = this.props.answer.selected ? 'mapping_right-choice' : '';
		return(
			<div className={isCorrectChoiceClass + " mapping_answer"}>
				<span>{this.props.index}</span>&nbsp;&nbsp;&nbsp;
				<input type="checkbox" checked={this.props.answer.selected} disabled />
				<span>{this.props.answer.text}</span><br/>
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
				<span>{this.props.index}</span>&nbsp;&nbsp;&nbsp;
				<span>{this.props.answer.text}</span>
			</div>
		);
	}
});

//Цифровой ввод
var MatchAnswerView = React.createClass({

	render: function(){
		return(
			<div className="mapping_answer">
				<div>{this.props.index}</div>
				<span>{this.props.answer.text}</span>
			</div>
		);
	}
});

//Текстовый ввод
var NumericalFillAnswerView = React.createClass({

	render: function(){
		return(
			<div className="mapping_answer">
				<div>{this.props.index}</div>
				<span>{this.props.answer.text}</span>
			</div>
		);
	}
});

//Соответствие
var GapFillAnswerView = React.createClass({

	render: function(){
		return(
			<div className="mapping_answer">
				<div>{this.props.index}</div>
				<span>{this.props.answer.text}</span>
			</div>
		);
	}
});

var QuestionView = React.createClass({
	render: function(){
		return(
			<div className="mapping_question">
				<span>{this.props.title}</span>
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
				<span>{this.props.name}</span>
				{this.props.questions.map(function(q){
					return <QuestionView key={q.uuid} title={q.title} type={q.type} answers={q.answers} />
				})}
			</div>
		);
	}
});

var MappingView = React.createClass({

	componentDidMount: function() {
		MappingStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		MappingStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getMappingState());
	},

	getInitialState: function () {
		return getMappingState();
	},

	render: function () {
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					{this.state.sections.map(function(s){
						return <SectionView key={s.uuid} name={s.name} questions={s.questions}/>
					}.bind(this))}
				</div>
			</div>
		);
	}
});

module.exports = MappingView;