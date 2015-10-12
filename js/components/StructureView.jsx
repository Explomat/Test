var React = require('react');
var StructureStore = require('../stores/StructureStore');
var StructureActions = require('../actions/StructureActions');
var QuestionView = require('./QuestionView');
var Hasher = require('../utils/Hasher');
var Config = require('../config');

var curDragQuestion = null, curDragSection = null, DRAG_EFFECT = 'move';

function getStructureState() {
	return {
		sections: StructureStore.getSections()
	};
}

var QuestionShortView = React.createClass({

	handleDragEnter: function(e){
		e.preventDefault();
		if (!curDragQuestion || curDragQuestion.node.id === this.props.uuid) return;
		if (curDragQuestion.sectionUuid === this.props.sectionUuid)
			StructureActions.replaceQuestionInSection(curDragQuestion.node.id, curDragQuestion.sectionUuid, this.props.uuid);
	},

	handleDragStart: function(e){
		e.dataTransfer.effectAllowed = DRAG_EFFECT;
		//this code is not needed, but FF not working without this
		e.dataTransfer.setData("text", "some text");
		//
		curDragQuestion = { node: e.target, sectionUuid: this.props.sectionUuid };
		curDragQuestion.node.classList.add('question-dnd-start');
	},

	handleDragEnd: function(e){
		e.preventDefault();
		e.target.classList.remove('question-dnd-start');
	},

	handleAllowDrop: function(e){
		e.preventDefault();
	},

	handleDrop: function(e){
		e.preventDefault();
		if (curDragQuestion && curDragQuestion.sectionUuid !== this.props.sectionUuid)
			StructureActions.replaceQuestionInNewSection(curDragQuestion.node.id, curDragQuestion.sectionUuid, this.props.sectionUuid);
		curDragQuestion = null;
	},

	handleEditQuestion: function(){
		Hasher.setHash('structure/question/'+ this.props.sectionUuid +'/'+this.props.uuid);
	},

	handleRemoveQuestion: function(){
		StructureActions.removeQuestion(this.props.sectionUuid, this.props.uuid);
	},

	handleShiftUp: function(){
		StructureActions.shiftUpQuestion(this.props.uuid, this.props.sectionUuid);
	},

	handleShiftDown: function () {
		StructureActions.shiftDownQuestion(this.props.uuid, this.props.sectionUuid);
	},

	render: function(){
		var questionIndex = StructureStore.getQuestionIndex(this.props.uuid);
		var sectionIndex = StructureStore.getSectionIndex(this.props.sectionUuid);

		var isShowArrowUp = { display : sectionIndex === 0 && questionIndex === 0 ? 'none' : 'block' };
		var isShowArrowDown = { display : sectionIndex === StructureStore.getSectionsCount() - 1 && questionIndex === StructureStore.getQuestionsCountInSection(this.props.sectionUuid) - 1 ? 'none' : 'block' };
		return(
			<div id={this.props.uuid} className="question" draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDrop={this.handleDrop} onDragOver={this.handleAllowDrop} onDragEnter={this.handleDragEnter}>
				<button title="Редактировать вопрос" type="button" className="btn btn-default btn-xs" onClick={this.handleEditQuestion}>
					<span className="glyphicon glyphicon-edit"></span>
				</button>
				<span>{this.props.title}</span>
				<div className="btn-group btn-group-xs pull-right question-buttons">
					<button type="button" style={isShowArrowUp} className="btn btn-default question-up-button" onClick={this.handleShiftUp}>
						<span className="glyphicon glyphicon-arrow-up"></span>
					</button>
					<button type="button" style={isShowArrowDown} className="btn btn-default question-down-button" onClick={this.handleShiftDown}>
						<span className="glyphicon glyphicon-arrow-down"></span>
					</button>
					<button title="Удалить вопрос" type="button" className="btn btn-default question-delete-button" onClick={this.handleRemoveQuestion}>
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

	handleDragStart: function(e){
		e.dataTransfer.effectAllowed = DRAG_EFFECT;
		//this code is not needed, but FF not working without this
		e.dataTransfer.setData("text", "some text");
		//
		curDragSection = { uuid: this.props.uuid };
		e.target.parentElement.classList.add('section-dnd-start');
	},

	handleDragEnd: function(e){
		e.preventDefault();
		e.target.parentElement.classList.remove('section-dnd-start');
	},

	handleDragEnter: function(e){
		e.preventDefault();
		if (!curDragSection || curDragSection.uuid === this.props.uuid) return;
		StructureActions.replaceSection(curDragSection.uuid, this.props.uuid);
	},

	handleDrop: function(e){
		e.preventDefault();
		if (curDragQuestion && curDragQuestion.sectionUuid !== this.props.uuid)
			StructureActions.replaceQuestionInNewSection(curDragQuestion.node.id, curDragQuestion.sectionUuid, this.props.uuid);
		curDragQuestion = curDragSection = null;
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

	handleShiftUp: function(){
		StructureActions.shiftUpSection(this.props.uuid);
	},

	handleShiftDown: function () {
		StructureActions.shiftDownSection(this.props.uuid);
	},

	toggleExpandSection: function(){
		StructureActions.toggleExpandSection(this.props.uuid);
	},

	render: function() {
		var sectionIndex = StructureStore.getSectionIndex(this.props.uuid);
		var isShowArrowUp = { display : sectionIndex === 0 ? 'none' : 'block' };
		var isShowArrowDown = { display : sectionIndex === StructureStore.getSectionsCount() - 1 ? 'none' : 'block' };
		var isDisplayQuestions = { display : this.props.isExpanded ? 'block' : 'none' };
		var isExpandClass = this.props.isExpanded ? "glyphicon glyphicon-minus" : "glyphicon glyphicon-plus";
		return (
			<div className="section-container" onDrop={this.handleDrop} onDragOver={this.handleAllowDrop}>
				<div className="section" draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDragEnter={this.handleDragEnter}>
					<div className="btn-group btn-group-xs">
						<button type="button" className="btn btn-default" onClick={this.toggleExpandSection}>
							<span className={isExpandClass}></span>
						</button>
						<button title="Редактировать раздел" type="button" className="btn btn-default" onClick={this.handleEditSection}>
							<span className="glyphicon glyphicon-edit"></span>
						</button>
					</div>
					<strong>{this.props.title}</strong>
					<div className="btn-group btn-group-xs pull-right section-buttons">
						<button type="button" style={isShowArrowUp} className="btn btn-default section-up-button" onClick={this.handleShiftUp}>
							<span className="glyphicon glyphicon-arrow-up"></span>
						</button>
						<button type="button" style={isShowArrowDown} className="btn btn-default section-down-button" onClick={this.handleShiftDown}>
							<span className="glyphicon glyphicon-arrow-down"></span>
						</button>
						<button title="Удалить раздел" type="button" className="btn btn-default section-delete-button" onClick={this.handleRemoveSection}>
							<span className="glyphicon glyphicon-remove"></span>
						</button>
					</div>
				</div>
				<div style={isDisplayQuestions}>
					{this.props.questions.map(function(q){
						return <QuestionShortView key={q.uuid} uuid={q.uuid} sectionUuid={this.props.uuid} title={q.title}/>;
					}.bind(this))}
				</div>
				<button title="Добавить вопрос" type="button" style={isDisplayQuestions} className="btn btn-default btn-xs add-question-button" onClick={this.handleDisplayNewQuestion}>
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
		var data = getStructureState();
		data.isExpandedSections = true;
		return data;
	},

	handleToggleExpandSections: function(){
		this.setState({isExpandedSections : !this.state.isExpandedSections});
		StructureActions.toggleExpandSections(!this.state.isExpandedSections);
	},

	render: function () {
		var expandSectionsClass = this.state.isExpandedSections ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus';
		return (
			<div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<button title="Добавить раздел" type="button" className="btn btn-default btn-sm" onClick={this.handleAddNewSection}>
							<span className="glyphicon glyphicon-plus"></span>
							<span>&nbsp;Добавить раздел</span>
						</button>
						<button type="button" className="btn btn-default btn-sm pull-right" onClick={this.handleToggleExpandSections}>
							<span className={expandSectionsClass}></span>
						</button>
					</div>
					<div className="panel-body">
						{this.state.sections.map(function(sec){
							return <SectionView key={sec.uuid} {...sec} />;
						})}
					</div>
				</div>
				<div id={Config.dom.modalId}></div>
			</div>
		);
	}
});

module.exports = StructureView;