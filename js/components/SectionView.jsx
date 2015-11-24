var React = require('react');
var SectionStore = require('../stores/SectionStore');
var SectionActions = require('../actions/SectionActions');
var StructureActions = require('../actions/StructureActions');
var Hasher = require('../utils/Hasher');
var ArrayUtils = require('../utils/Array');
var Txt = require('./modules/TextLabel');
var SectionKeys = require('../utils/SectionKeys');
var SectionValidation = require('../utils/validation/SectionValidation');
var ModalView = require('./modules/ModalView');
var QuestionTooltip = require('./modules/QuestionTooltip');
var DropDown = require('./modules/DropDown');

function getSectionState() {
	return {
		section: SectionStore.getSection()
	};
}

var SelectedUl = React.createClass({

	handleSelect: function(){
		if (this.props.handleSelect) {
			this.props.handleSelect(this.props.type);
		}
	},

	render: function() {
		return (
			<li onClick={this.handleSelect}><span>{this.props.value}</span></li>
		);
	}
});

var Fields = React.createClass({
	
	getInitialState: function(){
		return {
			isDisplayOrder: false,
			isDisplaySelection: false
		}
	},

	componentWillUnmount: function() {
		document.removeEventListener('click', this.handleBlurOrder);
		document.removeEventListener('click', this.handleBlurSelection);
	},

	componentDidMount: function() {
		document.addEventListener('click', this.handleBlurOrder);
		document.addEventListener('click', this.handleBlurSelection);
	},

	handleBlurOrder: function(){
		if (this.state.isDisplayOrder) {
			this.setState({isDisplayOrder: false});
		}
	},

	handleBlurSelection: function(){
		if (this.state.isDisplaySelection) {
			this.setState({isDisplaySelection: false});
		}
	},

	handleToogleDisplayOrder: function(e){
		if (e){
			e.stopPropagation();
    		e.nativeEvent.stopImmediatePropagation();
		}
		this.setState({isDisplayOrder : !this.state.isDisplayOrder});
	},

	handleToogleDisplaySelection: function(e){
		if (e){
			e.stopPropagation();
    		e.nativeEvent.stopImmediatePropagation();
		}
		this.setState({isDisplaySelection : !this.state.isDisplaySelection});
	},

	handleChangeTitle: function(val) {
		SectionActions.changeTitle(val);
	},

	handleChangePassingScore: function(val){
		SectionActions.changePassingScore(val);
	},

	handleChangeDuration: function(val){
		SectionActions.changeDuration(val);
	},

	handleChangeDuration: function(val){
		SectionActions.changeDuration(val);
	},

	handleSelectOrder: function(e, payload){
		this.handleBlurOrder();
		SectionActions.selectOrder(payload);
	},

	handleSelectSelection: function(e, payload){
		this.handleBlurSelection();
		SectionActions.selectSelection(payload);
	},

	render:function() {
		var isDisplayOrder = { display: this.state.isDisplayOrder ? 'block' : 'none' };
		var isDisplaySelection = { display: this.state.isDisplaySelection ? 'block' : 'none' };

		var qTypeValues = ArrayUtils.objectToArray(SectionKeys.order.values);
		qTypeValues = qTypeValues.map(function(qType){
			var types = Object.keys(qType).map(function(q){
				return { 'payload': q, 'text': qType[q] }
			});
			return types[0];
		});

		var qTypeValues2 = ArrayUtils.objectToArray(SectionKeys.selection.values);
		qTypeValues2 = qTypeValues2.map(function(qType){
			var types = Object.keys(qType).map(function(q){
				return { 'payload': q, 'text': qType[q] }
			});
			return types[0];
		});
		return (
			<div className="panel panel-default">
				<div className="panel-body">
		            <Txt.TextView value={this.props.title} onBlur={this.handleChangeTitle} placeholder='Название раздела'/>
		            <Txt.TextView value={this.props.passingScore} onBlur={this.handleChangePassingScore} isValid={SectionValidation.isValidPassingScore} placeholder='Проходной балл'/>
		            <Txt.TextView value={this.props.duration} onBlur={this.handleChangeDuration} isValid={SectionValidation.isValidDuration} placeholder='Длительность (минут)'/>
		        	<DropDown items={qTypeValues} selectedPayload={this.props.order} onChange={this.handleSelectOrder} />
		        	<DropDown items={qTypeValues2} selectedPayload={this.props.selection} onChange={this.handleSelectSelection} />
				</div>
	        </div>
		);
	}
});

var SectionView = React.createClass({

	componentDidMount: function() {
		SectionStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SectionStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSectionState());
	},

	getInitialState: function () {
		return getSectionState();
	},

	handleClose: function(){
		SectionStore.removeChangeListener(this._onChange);
		Hasher.setHash('structure/false');
	},

	handleSaveSection: function(){
		StructureActions.saveSection(SectionStore.getSection());
		SectionStore.removeChangeListener(this._onChange);
		Hasher.setHash('structure/false');
	},

	render: function(){
		return(
			<ModalView.ModalBox positionX={this.props.positionX} positionY={this.props.positionY}>
				<ModalView.ModalBoxContent>
					<ModalView.ModalBoxHeader onClose={this.handleClose}>
						<h4 className="modal-box__title">Добавьте раздел</h4>
					</ModalView.ModalBoxHeader>
					<ModalView.ModalBoxBody>
						<Fields {...this.state.section}/>
					</ModalView.ModalBoxBody>
					<ModalView.ModalBoxFooter onSave={this.handleSaveSection} />
				</ModalView.ModalBoxContent>
			</ModalView.ModalBox>
		);
	}
});

module.exports = SectionView;