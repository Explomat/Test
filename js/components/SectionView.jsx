var React = require('react');
var SectionStore = require('../stores/SectionStore');
var SectionActions = require('../actions/SectionActions');
var StructureActions = require('../actions/StructureActions');
var Hasher = require('../utils/Hasher');
var UI = require('../utils/UI');
var Txt = require('./modules/TextLabel');
var SectionKeys = require('../utils/SectionKeys');
var SectionValidation = require('../utils/validation/SectionValidation');

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

	handleSelectOrder: function(type){
		this.handleBlurOrder();
		SectionActions.selectOrder(type);
	},

	handleSelectSelection: function(type){
		this.handleBlurSelection();
		SectionActions.selectSelection(type);
	},

	render:function() {
		var isDisplayOrder = { display: this.state.isDisplayOrder ? 'block' : 'none' };
		var isDisplaySelection = { display: this.state.isDisplaySelection ? 'block' : 'none' };
		return (
			<div className="panel panel-default">
				<div className="panel-body">
		            <Txt.TextView value={this.props.title} onBlur={this.handleChangeTitle} placeholder='Название раздела'/>
		            <Txt.TextView value={this.props.passingScore} onBlur={this.handleChangePassingScore} isValid={SectionValidation.isValidPassingScore} placeholder='Проходной балл'/>
		            <Txt.TextView value={this.props.duration} onBlur={this.handleChangeDuration} isValid={SectionValidation.isValidDuration} placeholder='Длительность (минут)'/>
		        	<div className="input-group all">
						<button className="btn btn-default dropdown-toggle" type="button" onClick={this.handleToogleDisplayOrder}>
							<span>{SectionKeys.order.values[this.props.order]}&nbsp;&nbsp;</span>
							<span className="caret"></span>
						</button>
						<ul className="dropdown-menu" style={isDisplayOrder}>
							{Object.keys(SectionKeys.order.keys).map(function(o, index){
								return <SelectedUl key={index} handleSelect={this.handleSelectOrder} value={SectionKeys.order.values[o]} type={o}/>
							}.bind(this))}
						</ul>
					</div>
					<div className="input-group all">
						<button className="btn btn-default dropdown-toggle" type="button" onClick={this.handleToogleDisplaySelection}>
							<span>{SectionKeys.selection.values[this.props.selection]}&nbsp;&nbsp;</span>
							<span className="caret"></span>
						</button>
						<ul className="dropdown-menu" style={isDisplaySelection}>
							{Object.keys(SectionKeys.selection.keys).map(function(s, index){
								return <SelectedUl key={index} handleSelect={this.handleSelectSelection} value={SectionKeys.selection.values[s]} type={s}/>
							}.bind(this))}
						</ul>
					</div>
				</div>
	        </div>
		);
	}
});

var SectionView = React.createClass({

    propTypes: {
    	postionX: React.PropTypes.number,
    	postionY: React.PropTypes.number,
    	scale: React.PropTypes.number,
    },

    getDefaultProps: function(){
    	return {
    		positionX: 0,
    		positionY: 0,
    		scale: 0.1
    	}
    },

    shift: function(){
    	var coordinates = UI.getElementCoordinates(this.refs.section);
		var shiftX = coordinates.positionX < this.props.positionX ? (coordinates.positionX - this.props.positionX)/this.props.scale : (this.props.positionX - coordinates.positionX)/this.props.scale;
		var shiftY = coordinates.positionY > this.props.positionY ? (coordinates.positionY - this.props.positionY) / this.props.scale : (this.props.positionY - coordinates.positionY) * this.props.scale;
		this.refs.section.style.transform = 'scale('+ this.props.scale +')translate('+ shiftX+'px,'+shiftY+'px)';
    },

    toggle: function() {
        this.setState({isMounted: !this.state.isMounted});
    },

	componentDidMount: function() {
		SectionStore.addChangeListener(this._onChange);
		this.shift();
		setTimeout(this.toggle, 0);
	},

	componentWillUnmount: function() {
		SectionStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSectionState());
	},

	getInitialState: function () {
		var sectionState = getSectionState();
		sectionState.isMounted = false;
		return sectionState;
	},

	handleClose: function(){
		SectionStore.removeChangeListener(this._onChange);
		Hasher.setHash('structure');
	},

	handleSaveSection: function(){
		StructureActions.saveSection(SectionStore.getSection());
		SectionStore.removeChangeListener(this._onChange);
		Hasher.setHash('structure');
	},

	render: function () {
		var classes = '';
        if (this.state.isMounted) {
            classes = ' modal-box__dialog_show';
        }
		return (
			<div className="modal-box" style={{display: "block"}}>
				<div ref="section" className={"modal-box__dialog modal-box__dialog_translate" + classes}>
					<div className="modal-box__content">
						<div className="modal-box__header">
							<button type="button" className="close" onClick={this.handleClose}>&times;</button>
        					<h4 className="modal-title">Добавьте раздел</h4>
						</div>
						<div className="modal-box__body">
							<Fields {...this.state.section}/>
						</div>
						<div className="modal-box__footer">
					        <button type="button" className="btn btn-default" onClick={this.handleSaveSection}>Сохранить</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = SectionView;