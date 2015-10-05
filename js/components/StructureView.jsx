var React = require('react');
var StructureStore = require('../stores/StructureStore');
var StructureActions = require('../actions/StructureActions');
var QuestionView = require('./QuestionView');
var Hasher = require('../utils/Hasher');
var Config = require('../config');

var curDragQuestion = null;

function getStructureState() {
	return {
		sections: StructureStore.getSections()
	};
}

var QuestionShortView = React.createClass({

	handleDragEnter: function(e){
		e.preventDefault();
		if (!curDragQuestion || curDragQuestion.node.id === this.props.uuid) return;
		if (curDragQuestion.curSectionUuid !== this.props.sectionUuid)
			curDragQuestion.curSectionUuid = this.props.sectionUuid;
		//curDragQuestion.sectionUuid = this.props.sectionUuid;
		StructureActions.replaceQuestion(curDragQuestion.node.id, curDragQuestion.sectionUuid, this.props.sectionUuid, this.props.uuid, curDragQuestion.curSectionUuid);
	},

	handleDragStart: function(e){
		curDragQuestion = { node: e.target, sectionUuid: this.props.sectionUuid, curSectionUuid: this.props.sectionUuid };
		curDragQuestion.node.classList.add('question-dnd-start');
		//e.dataTransfer.setData('text', JSON.stringify({questionUuid: this.props.uuid, sectionUuid: this.props.sectionUuid}));
	},

	handleDragEnd: function(e){
		e.preventDefault();
		e.target.classList.remove('question-dnd-start');
	},

	handleAllowDrop: function(e){
		e.preventDefault();
	},

	handleDrop: function(e){
		curDragQuestion = null;
		e.preventDefault();
	},

	handleEditQuestion: function(){
		Hasher.setHash('structure/question/'+ this.props.sectionUuid +'/'+this.props.uuid);
	},

	handleRemoveQuestion: function(){
		StructureActions.removeQuestion(this.props.sectionUuid, this.props.uuid);
	},

	render: function(){
		return(
			<div id={this.props.uuid} data-sectionuuid={this.props.sectionUuid} className="question" draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDrop={this.handleDrop} onDragOver={this.handleAllowDrop} onDragEnter={this.handleDragEnter}>
				<button title="Редактировать вопрос" type="button" className="btn btn-default btn-xs" onClick={this.handleEditQuestion}>
					<span className="glyphicon glyphicon-edit"></span>
				</button>
				&nbsp;<span>{this.props.title}</span>
				<div className="btn-group btn-group-xs pull-right">
					<button title="Удалить вопрос" type="button" className="btn btn-default" onClick={this.handleRemoveQuestion}>
						<span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>
			</div>
		);
	}
});

var SectionView = React.createClass({

	handleAllowDrop: function(e){
		e.preventDefault();
	},

	handleDrop: function(e){
		e.preventDefault();
		if (this.props.questions.length > 0) return;
		StructureActions.replaceQuestion(curDragQuestion.node.id, curDragQuestion.sectionUuid, this.props.uuid);
		curDragQuestion = null;
	},

	handleEditSection: function(){
		Hasher.setHash('structure/section/'+ this.props.uuid);
	},

	handleDisplayNewQuestion: function(){
		Hasher.setHash('structure/question/'+ this.props.uuid);
	},

	handleRemoveSection: function(){
		StructureActions.removeSection(this.props.uuid);
	},

	render: function() {
		return (
			<div className="section" onDrop={this.handleDrop} onDragOver={this.handleAllowDrop}>
				<button title="Редактировать раздел" type="button" className="btn btn-default btn-xs" onClick={this.handleEditSection}>
					<span className="glyphicon glyphicon-edit"></span>
				</button>
				&nbsp;<span>{this.props.name}</span>
				<div className="btn-group btn-group-xs pull-right">
					<button title="Удалить раздел" type="button" className="btn btn-default btn-xs" onClick={this.handleRemoveSection}>
						<span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>
				<div>
					{this.props.questions.map(function(q){
						return <QuestionShortView key={q.uuid} uuid={q.uuid} sectionUuid={this.props.uuid} title={q.title}/>;
					}.bind(this))}
				</div>
				<button title="Добавить вопрос" type="button" className="btn btn-default btn-xs button-add-question" onClick={this.handleDisplayNewQuestion}>
					<span className="glyphicon glyphicon-plus"></span>
					<span>&nbsp;Добавить вопрос</span>
				</button>
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
		StructureActions.saveStructure(StructureStore.getStructure());
	},

	_onChange: function() {
		this.setState(getStructureState());
	},

	handleAddNewSection: function(){
		Hasher.setHash('structure/section');
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
				<div id={Config.dom.modalId}></div>
			</div>
		);
	}
});

module.exports = StructureView;