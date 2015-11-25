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
var QuestionTooltipField = require('./modules/tooltip/QuestionTooltipField');
var DropDown = require('./modules/DropDown');

function getSectionState() {
	return {
		section: SectionStore.getSection()
	};
}

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

	getDataForSelect: function(selectObj){
		var select = ArrayUtils.objectToArray(selectObj).map(function(so){
			var arr = Object.keys(so).map(function(q){
				return { 'payload': q, 'text': so[q] }
			});
			return arr[0];
		});
		return select;
	},

	render: function() {
		var isDisplayOrder = { display: this.state.isDisplayOrder ? 'block' : 'none' };
		var isDisplaySelection = { display: this.state.isDisplaySelection ? 'block' : 'none' };
		var selectOrderData = this.getDataForSelect(SectionKeys.order.values);
		var selectSelectionData = this.getDataForSelect(SectionKeys.selection.values);
		return (
			<div className="section-modal panel panel-default">
				<div className="panel-body">
		            <Txt.TextView value={this.props.title} onBlur={this.handleChangeTitle} placeholder='Название раздела'/>
		            <Txt.TextView value={this.props.passingScore} onBlur={this.handleChangePassingScore} isValid={SectionValidation.isValidPassingScore} placeholder='Проходной балл'/>
		            <Txt.TextView value={this.props.duration} onBlur={this.handleChangeDuration} isValid={SectionValidation.isValidDuration} placeholder='Длительность (минут)'/>
		        	<div className="section-modal__dropdowns all">
		        		<div className="section-modal__dropdown-first">
		        			<QuestionTooltipField.QuestionTooltipFieldRight text={"Порядок следования вопросов"}>
		        				<DropDown items={selectOrderData} selectedPayload={this.props.order} onChange={this.handleSelectOrder} />
		        			</QuestionTooltipField.QuestionTooltipFieldRight>
			        	</div>
			        	<div className="section-modal__dropdown-second">
			        		<QuestionTooltipField.QuestionTooltipFieldRight text={"Выборка"}>
			        			<DropDown items={selectSelectionData} selectedPayload={this.props.selection} onChange={this.handleSelectSelection} />
			        		</QuestionTooltipField.QuestionTooltipFieldRight>
			        	</div>
			        </div>
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