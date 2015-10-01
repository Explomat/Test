var React = require('react');
var MappingStore = require('../stores/MappingStore');
var MappingActions = require('../actions/SectionActions');
var QuestionTypes = require('../utils/QuestionTypes');

function getMappingState() {
	return {
		sections: MappingStore.getSections()
	};
}

var SingleChoiceAnswerView = React.createClass({

	render: function(){
		var isCorrectChoiceStyle = this.props.answer.selected ? 'right-choice' : '';
		return(
			<div className={isCorrectChoiceStyle}>
				<span>{this.props.index}</span>&nbsp;&nbsp;&nbsp;
				<input type="radio" checked={this.props.answer.selected} disabled />
				<span>{this.props.answer.text}</span><br/>
				<label>Вес : <span>{this.props.answer.weight}</span></label>
			</div>
		);
	}
});


var MultipleChoiceAnswerView = React.createClass({

	render: function(){
		var isCorrectChoiceStyle = this.props.answer.selected ? 'right-choice' : '';
		return(
			<div className={isCorrectChoiceStyle}>
				<span>{this.props.index}</span>&nbsp;&nbsp;&nbsp;
				<input type="checkbox" checked={this.props.answer.selected} disabled />
				<span>{this.props.answer.text}</span><br/>
				<label>Вес : <span>{this.props.answer.weight}</span></label>
			</div>
		);
	}
});

var OrderAnswerView = React.createClass({

	render: function(){	
		return(
			<div>
				<span>{this.props.index}</span>&nbsp;&nbsp;&nbsp;
				<span>{this.props.answer.text}</span>
			</div>
		);
	}
});


var MatchAnswerView = React.createClass({

	render: function(){
		return(
			<div>
				<div>{this.props.index}</div>
				<span>{this.props.answer.text}</span>
			</div>
		);
	}
});

var NumericalFillAnswerView = React.createClass({

	render: function(){
		return(
			<div>
				<div>{this.props.index}</div>
				<span>{this.props.answer.text}</span>
			</div>
		);
	}
});

var ConformityAnswerView = React.createClass({

	render: function(){
		return(
			<div>
				<div>{this.props.index}</div>
				<span>{this.props.answer.text}</span>
			</div>
		);
	}
});

var QuestionView = React.createClass({
	render: function(){
		return(
			<div>
				<span>{this.props.title}</span>
				{this.props.answers.map(function(a, index){
					switch(this.props.type){
						case QuestionTypes.keys.multiple_choice:
							return <SingleChoiceAnswerView key={a.uuid} answer={a} index={index + 1} />
						case QuestionTypes.keys.multiple_response:
							return <MultipleChoiceAnswerView key={a.uuid} answer={a} index={index + 1} />
						case QuestionTypes.keys.order:
							return <OrderAnswerView key={a.uuid} answer={a} index={index + 1} />
						case QuestionTypes.keys.match_item:
							return <MatchAnswerView key={a.uuid} answer={a} index={index + 1} />
						case QuestionTypes.keys.numerical_fill_in_blank:
							return <NumericalFillAnswerView key={a.uuid} answer={a} index={index + 1} />
						case QuestionTypes.keys.gap_fill:
							return <ConformityAnswerView key={a.uuid} answer={a} index={index + 1} />
					}
				}.bind(this))}
			</div>
		);
	}
});

var SectionView = React.createClass({

	render: function(){
		return(
			<div>
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