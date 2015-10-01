var React = require('react');
var MappingStore = require('../stores/MappingStore');
var MappingActions = require('../actions/SectionActions');
var QuestionTypes = require('../utils/QuestionTypes');

function getMappingState() {
	return {
		sections: MappingStore.getSections()
	};
}

var ChoiceAnswerView = React.createClass({

	render: function(){
		return(
			<div>A</div>
		);
	}
});

var OrderAnswerView = React.createClass({

	render: function(){	
		return(
			<div>B</div>
		);
	}
});


var MatchItemAnswerView = React.createClass({

	render: function(){
		return(
			<div>C</div>
		);
	}
});

var NumericalFillAnswerView = React.createClass({

	render: function(){
		return(
			<div>D</div>
		);
	}
});

var ConformityAnswerView = React.createClass({

	render: function(){
		return(
			<div>E</div>
		);
	}
});

var SectionView = React.createClass({

	render: function(){
		return(
			<div>
				<span>{this.props.name}</span>
				{this.props.questions.map(function(q){
					if (q.type === QuestionTypes.keys.multiple_choice || q.type === QuestionTypes.keys.multiple_response)
						return <ChoiceAnswerView />
					else if (q.type === QuestionTypes.keys.order)
						return <OrderAnswerView />
					else if (q.type === QuestionTypes.keys.match_item)
						return <MatchItemAnswerView />
					else if (q.type === QuestionTypes.keys.numerical_fill_in_blank)
						return <NumericalFillAnswerView />
					else if (q.type === QuestionTypes.keys.gap_fill)	
						return <ConformityAnswerView />
				}.bind(this))}
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
			<div>
				{this.state.sections.map(function(s){
					return <SectionView key={s.uuid} name={s.name} questions={s.questions}/>
				}.bind(this))}
			</div>
		);
	}
});

module.exports = MappingView;