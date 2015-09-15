var React = require('react');
var StructureStore = require('../stores/StructureStore');
var StructureActions = require('../actions/StructureActions');
var QuestionView = require('./QuestionView');
var Router = require('../router');

function getStructureState() {
	return {
		sections: StructureStore.getSections()
	};
}

var QuestionShortView = React.createClass({
	render: function(){
		return(
			<div>
				&nbsp;&nbsp;&nbsp;<span>{this.props.title}</span>
			</div>
		);
	}
});

var SectionView = React.createClass({

	handleDisplayNewQuestion: function(){
		Router.navigate('#structure/'+ this.props.uuid);
	},

	handleRemoveSection: function(){
		StructureActions.removeSection(this.props.uuid);
	},

	render: function() {
		return (
			<div>
				<span>{this.props.name}</span>
				<div className="btn-group btn-group-xs pull-right">
					<button title="Добавить вопрос" type="button" className="btn btn-default" onClick={this.handleDisplayNewQuestion}>
						<span className="glyphicon glyphicon-plus"></span>
					</button>
					<button title="Удалить раздел" type="button" className="btn btn-default" onClick={this.handleRemoveSection}>
						<span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>
				<div>
					{this.props.questions.map(function(q){
						return <QuestionShortView key={q.uuid} title={q.title}/>;
					})}
				</div>
			</div>
		);
	}
});

var StructureView = React.createClass({

	componentDidMount: function() {
		StructureStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		StructureStore.removeChangeListener(this._onChange);
		StructureActions.save(StructureStore.getStructure());
	},

	_onChange: function() {
		this.setState(getStructureState());
	},

	handleAddNewSection: function(){
		StructureActions.addSection();
	},

	getInitialState: function () {
		return getStructureState();
	},

	render: function () {
		return (
			<div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<button title="Добавить раздел" type="button" className="btn btn-default btn-sm" onClick={this.handleAddNewSection}>
							<span className="glyphicon glyphicon-plus"></span>
							<span>&nbsp;Добавить раздел</span>
						</button>
					</div>
					<div className="panel-body">
						{this.state.sections.map(function(sec){
							return <SectionView uuid={sec.uuid} key={sec.uuid} name={sec.name} questions={sec.questions}/>;
						})}
					</div>
				</div>
				<div id="add_question"></div>
			</div>
		);
	}
});

module.exports = StructureView;