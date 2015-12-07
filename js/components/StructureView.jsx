var React = require('react');
var StructureStore = require('../stores/StructureStore');
var StructureActions = require('../actions/StructureActions');
var Hasher = require('../utils/Hasher');
var UI = require('../utils/UI');
var Config = require('../config');
var QuestionTypes = require('../utils/QuestionTypes');

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
		curDragQuestion.node.classList.add('question_dnd-start');
	},

	handleDragEnd: function(e){
		e.preventDefault();
		e.target.classList.remove('question_dnd-start');
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

	handleEditQuestion: function(e){
		var coordinates = UI.getElementCoordinates(e.target);
		Hasher.setHash('structure/question/'+ (coordinates.positionX + (coordinates.width / 2))  +'/' + (coordinates.positionY - (coordinates.height / 2)) + '/' + this.props.sectionUuid +'/'+this.props.uuid);
	},

	handleRemoveQuestion: function(){
		if (confirm('Вы действительно хотите удалить вопрос под номером '+ this.props.number +' ?')){
			StructureActions.removeQuestion(this.props.sectionUuid, this.props.uuid);
		}
	},

	render: function(){
		return(
			<div id={this.props.uuid} className="question" draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDrop={this.handleDrop} onDragOver={this.handleAllowDrop} onDragEnter={this.handleDragEnter}>
				<div className="question__number-box">
					<span className="question__number">{this.props.number}</span>
				</div>
				<div className="question__content">
					<p className="question__title">{this.props.text}</p>
					<div className="question__description">
						<span className="question__type">{QuestionTypes.values[this.props.type]}</span>
					</div>
					<div className="pull-right question__buttons">
						<div className="btn-group btn-group-xs question__edit-group">
							<span title="Редактировать вопрос" onClick={this.handleEditQuestion} className="question__edit-button glyphicon glyphicon-pencil glyphicon-box_lg"></span>
							<span title="Удалить вопрос"  onClick={this.handleRemoveQuestion} className="question__edit-button glyphicon glyphicon-trash glyphicon-box_lg"></span>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var SectionView = React.createClass({

	stopPropagation: function(e){
		e.stopPropagation();
    	e.nativeEvent.stopImmediatePropagation();
	},

	handleAllowDrop: function(e){
		e.preventDefault();
	},

	handleDragStart: function(e){
		e.dataTransfer.effectAllowed = DRAG_EFFECT;
		//this code is not needed, but FF not working without this
		e.dataTransfer.setData("text", "some text");
		//
		curDragSection = { uuid: this.props.uuid };
		e.target.parentElement.classList.add('section__dnd-start');
	},

	handleDragEnd: function(e){
		e.preventDefault();
		e.target.parentElement.classList.remove('section__dnd-start');
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

	handleEditSection: function(e){
		this.stopPropagation(e);
		var coordinates = UI.getElementCoordinates(e.target);
		Hasher.setHash('structure/section/' + (coordinates.positionX + (coordinates.width / 2)) + '/' + (coordinates.positionY - (coordinates.height / 2)) + '/' + this.props.uuid);
	},

	handleRemoveSection: function(e){
		this.stopPropagation(e);
		if (confirm('Вы действительно хотите удалить раздел ?')){
			StructureActions.removeSection(this.props.uuid);
		}
	},

	handleToggleSelectSection: function(e){
		StructureActions.toggleSelectSection(this.props.uuid);
	},

	render: function() {
		var selectedClass = StructureStore.isSectionSelected(this.props.uuid) ? 'section_selected': '';
		return (
			<div className={"section " + selectedClass} onDrop={this.handleDrop} onDragOver={this.handleAllowDrop} onClick={this.handleToggleSelectSection}>
				<div className="section__content" draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDragEnter={this.handleDragEnter}>
					<p title={this.props.title} className="section__title">{this.props.title}</p>
					<div className="section__description">
						<span className="section__questions-count">Вопросов: {this.props.questions.length}</span>
					</div>
					<div className="pull-right section__buttons">
						<div className="btn-group btn-group-xs section__edit-group">
							<span title="Редактировать раздел" onClick={this.handleEditSection} className="section__button-edit glyphicon glyphicon-pencil glyphicon-box_lg"></span>
							<span title="Удалить раздел" onClick={this.handleRemoveSection} className="section__button-edit glyphicon glyphicon-trash glyphicon-box_lg"></span>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var StructureView = React.createClass({

	toggle: function() {
        this.setState({isMounted: !this.state.isMounted});
    },

	componentDidMount: function() {
		StructureStore.addChangeListener(this._onChange);
		setTimeout(this.toggle, 0);
	},

	componentWillUnmount: function() {
		StructureStore.removeChangeListener(this._onChange);
		StructureActions.saveStructure(StructureStore.getStructure());
	},

	_onChange: function() {
		this.setState(getStructureState());
	},

	handleAddNewSection: function(e){
		var coordinates = UI.getElementCoordinates(e.target);
		Hasher.setHash('structure/section/' + (coordinates.positionX + (coordinates.width / 2)) + '/' + (coordinates.positionY - (coordinates.height / 2)));
	},

	handleAddNewQuestion: function(e){
		var coordinates = UI.getElementCoordinates(e.target);
		var sectionSelected = StructureStore.getSectionSelected();
		Hasher.setHash('structure/question/'+ (coordinates.positionX + (coordinates.width / 2)) + '/' + (coordinates.positionY - (coordinates.height / 2)) + '/' + sectionSelected.uuid);
	},

	getInitialState: function () {
		var data = getStructureState();
		data.isMounted = false;
		return data;
	},

	render: function () {
		var classes = '';
		if (this.props.isAnimate) classes += ' tests__body-content_translate';
        if (this.state.isMounted && this.props.isAnimate) classes = ' tests__body-content_show';
        var sectionSelected = StructureStore.getSectionSelected();
        var questions = sectionSelected ? sectionSelected.questions : [];
        var isDisabledAddQuestionButton = this.state.sections.length === 0;
		return (
			<div className={"tests__body-content" + classes}>
				<div className="row clearfix">
					<div className="structure">
						<div className="col-lg-4">
							<div className="structure__sections">
								<div className="structure__sections-header">
									<button title="Добавить раздел" type="button" className="btn btn-primary btn-sm" onClick={this.handleAddNewSection}>
										<span className="glyphicon glyphicon-plus"></span>
										<span>&nbsp;Добавить раздел</span>
									</button>
								</div>
								<div className="structure__sections-body">
									{this.state.sections.map(function(sec){
										return <SectionView key={sec.uuid} {...sec} />;
									})}
								</div>
							</div>
						</div>
						<div className="col-lg-8">
							<div className="structure__questions">
								<div className="structure__questions-header">
									<button title="Добавить вопрос" type="button" className="btn btn-primary btn-sm" onClick={this.handleAddNewQuestion} disabled={isDisabledAddQuestionButton}>
										<span className="glyphicon glyphicon-plus"></span>
										<span>&nbsp;Добавить вопрос</span>
									</button>
								</div>
								<div className="structure__questions-body">
									{questions.map(function(q, index){
										return <QuestionShortView key={q.uuid} uuid={q.uuid} sectionUuid={sectionSelected.uuid} {...q} number={index + 1}/>;
									}.bind(this))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id={Config.dom.modalId}></div>
			</div>
		);
	}
});

module.exports = StructureView;