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
		curDragQuestion.node.classList.add('question__dnd-start');
	},

	handleDragEnd: function(e){
		e.preventDefault();
		e.target.classList.remove('question__dnd-start');
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
		Hasher.setHash('structure/question/'+ coordinates.positionX +'/' + coordinates.positionY + '/' + this.props.sectionUuid +'/'+this.props.uuid);
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

		var isShowArrowUp = { display : sectionIndex === 0 && questionIndex === 0 ? 'none' : 'inline-block' };
		var isShowArrowDown = { display : sectionIndex === StructureStore.getSectionsCount() - 1 && questionIndex === StructureStore.getQuestionsCountInSection(this.props.sectionUuid) - 1 ? 'none' : 'inline-block' };
		return(
			<div id={this.props.uuid} className="question" draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDrop={this.handleDrop} onDragOver={this.handleAllowDrop} onDragEnter={this.handleDragEnter}>
				<p className="question__title">{this.props.title}</p>
				<div className="question__description">
					<span className="question__type">Тип: {QuestionTypes.values[this.props.type]}</span>
				</div>
				<div className="pull-right question__buttons">
					<div className="btn-group btn-group-xs question__sort-group">
						<span onClick={this.handleShiftUp} style={isShowArrowUp} className="question__edit-button question__edit-button_margin glyphicon glyphicon-arrow-up"></span>
						<span onClick={this.handleShiftDown} style={isShowArrowDown} className="question__edit-button question__edit-button_margin glyphicon glyphicon-arrow-down"></span>
					</div>
					<div className="btn-group btn-group-xs question__edit-group">
						<span title="Редактировать вопрос" onClick={this.handleEditQuestion} className="question__edit-button glyphicon glyphicon-edit"></span>
						<span title="Удалить вопрос"  onClick={this.handleRemoveQuestion} className="question__edit-button glyphicon glyphicon-remove"></span>
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
		Hasher.setHash('structure/section/' + coordinates.positionX + '/' + coordinates.positionY + '/' + this.props.uuid);
	},

	handleRemoveSection: function(){
		StructureActions.removeSection(this.props.uuid);
	},

	handleShiftUp: function(e){
		this.stopPropagation(e);
		StructureActions.shiftUpSection(this.props.uuid);
	},

	handleShiftDown: function (e) {
		this.stopPropagation(e);
		StructureActions.shiftDownSection(this.props.uuid);
	},

	handleToggleSelectSection: function(e){
		StructureActions.toggleSelectSection(this.props.uuid);
	},

	render: function() {
		var sectionIndex = StructureStore.getSectionIndex(this.props.uuid);
		var isShowArrowUp = { display : sectionIndex === 0 ? 'none' : 'inline-block' };
		var isShowArrowDown = { display : sectionIndex === StructureStore.getSectionsCount() - 1 ? 'none' : 'inline-block' };
		var selectedClass = StructureStore.isSectionSelected(this.props.uuid) ? 'section_selected': '';
		return (
			<div className={"section " + selectedClass} onDrop={this.handleDrop} onDragOver={this.handleAllowDrop} onClick={this.handleToggleSelectSection}>
				<div className="section__content" draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDragEnter={this.handleDragEnter}>
					<p title={this.props.title} className="section__title">{this.props.title}</p>
					<div className="section__description">
						<span className="section__questions-count">Вопросов: {this.props.questions.length}</span>
					</div>
					<div className="pull-right section__buttons">
						<div className="btn-group btn-group-xs section__sort-group">
							<span onClick={this.handleShiftUp} style={isShowArrowUp} className="section__button-edit section__button-edit_margin glyphicon glyphicon-arrow-up glyphicon-box_lg"></span>
							<span onClick={this.handleShiftDown} style={isShowArrowDown} className="section__button-edit section__button-edit_margin glyphicon glyphicon-arrow-down glyphicon-box_lg"></span>
						</div>
						<div className="btn-group btn-group-xs section__edit-group">
							<span title="Редактировать раздел" onClick={this.handleEditSection} className="section__button-edit glyphicon glyphicon-edit glyphicon-box_lg"></span>
							<span title="Удалить раздел" onClick={this.handleRemoveSection} className="section__button-edit glyphicon glyphicon-remove glyphicon-box_lg"></span>
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
		Hasher.setHash('structure/section/' + coordinates.positionX + '/' + coordinates.positionY);
	},

	handleAddNewQuestion: function(e){
		var coordinates = UI.getElementCoordinates(e.target);
		var sectionSelected = StructureStore.getSectionSelected();
		Hasher.setHash('structure/question/'+ coordinates.positionX +'/' + coordinates.positionY + '/' + sectionSelected.uuid);
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
		return (
			<div className={"tests__body-content" + classes}>
				<div className="row clearfix">
					<div className="structure col-lg-10 col-lg-offset-1">
						<div className="structure__content">
							<div className="col-lg-4">
								<div className="structure__sections">
									<div className="structure__sections-header">
										<button title="Добавить раздел" type="button" className="btn btn-default btn-sm" onClick={this.handleAddNewSection}>
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
										<button title="Добавить вопрос" type="button" className="btn btn-default btn-sm" onClick={this.handleAddNewQuestion}>
											<span className="glyphicon glyphicon-plus"></span>
											<span>&nbsp;Добавить вопрос</span>
										</button>
									</div>
									<div className="structure__questions-body">
										{questions.map(function(q){
											return <QuestionShortView key={q.uuid} uuid={q.uuid} sectionUuid={sectionSelected.uuid} {...q}/>;
										}.bind(this))}
									</div>
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

/*var React = require('react');
var StructureStore = require('../stores/StructureStore');
var StructureActions = require('../actions/StructureActions');
var Hasher = require('../utils/Hasher');
var UI = require('../utils/UI');
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

	handleEditQuestion: function(e){
		var coordinates = UI.getElementCoordinates(e.target);
		Hasher.setHash('structure/question/'+ coordinates.positionX +'/' + coordinates.positionY + '/' + this.props.sectionUuid +'/'+this.props.uuid);
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

	handleEditSection: function(e){
		var coordinates = UI.getElementCoordinates(e.target);
		Hasher.setHash('structure/section/' + coordinates.positionX + '/' + coordinates.positionY + '/' + this.props.uuid);
	},

	handleDisplayNewQuestion: function(e){
		var coordinates = UI.getElementCoordinates(e.target);
		Hasher.setHash('structure/question/'+ coordinates.positionX +'/' + coordinates.positionY + '/' + this.props.uuid);
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
			<div className="sections" onDrop={this.handleDrop} onDragOver={this.handleAllowDrop}>
				<div className="sections__section" draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDragEnter={this.handleDragEnter}>
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
		Hasher.setHash('structure/section/' + coordinates.positionX + '/' + coordinates.positionY);
	},

	getInitialState: function () {
		var data = getStructureState();
		data.isExpandedSections = true;
		data.isMounted = false;
		return data;
	},

	handleToggleExpandSections: function(){
		this.setState({isExpandedSections : !this.state.isExpandedSections});
		StructureActions.toggleExpandSections(!this.state.isExpandedSections);
	},

	render: function () {
		var classes = '';
		if (this.props.isAnimate) classes += ' tests__body-content_translate';
        if (this.state.isMounted && this.props.isAnimate) classes = ' tests__body-content_show';
		var expandSectionsClass = this.state.isExpandedSections ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus';
		return (
			<div className={"structure tests__body-content" + classes}>
				<div className="group">
					<div className="group__elem">
						<div className="structure__header">
							<button title="Добавить раздел" type="button" className="btn btn-default btn-sm" onClick={this.handleAddNewSection}>
								<span className="glyphicon glyphicon-plus"></span>
								<span>&nbsp;Добавить раздел</span>
							</button>
							<button type="button" className="btn btn-default btn-sm pull-right" onClick={this.handleToggleExpandSections}>
								<span className={expandSectionsClass}></span>
							</button>
						</div>
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

module.exports = StructureView;*/