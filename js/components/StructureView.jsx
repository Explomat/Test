var React = require('react');
var StructureStore = require('../stores/StructureStore');

function getStructureState() {
	return {
		sections: StructureStore.getSections()
	};
}

var QuestionShortView = React.createClass({
	render: function(){
		return(
			<div>
				&nbsp;&nbsp;&nbsp;{this.props.title}
			</div>
		);
	}
});

var SectionView = React.createClass({

	handleAddQuestion: function(){

	},

	render: function() {
		return (
			<div>
				<span>{this.props.name}</span>
				<div className="pull-right">
					<button type="button" className="btn btn-default btn-xs" onClick={this.handleAddQuestion}>
						<span className="glyphicon glyphicon-plus"></span>
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

	componentDidMount:function() {
		StructureStore.addChangeListener(this._onChange);
	},

	componentWillUnmount:function() {
		StructureStore.removeChangeListener(this._onChange);
	},

	_onChange:function() {
		this.setState(getStructureState());
	},

	getInitialState: function () {
		return getStructureState();
	},

	render:function () {
		console.log(this.state.sections);
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<button type="button" className="btn btn-default btn-sm" onClick={this.handleAddSection}>
						<span className="glyphicon glyphicon-plus"></span>
						<span>&nbsp;Добавить раздел</span>
					</button>
				</div>
				<div className="panel-body">
					{this.state.sections.map(function(sec){
						return <SectionView key={sec.uuid} name={sec.name} questions={sec.questions}/>;
					})}
				</div>
			</div>
		);
	}
});

module.exports = StructureView;