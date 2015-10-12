var React = require('react');
var SectionStore = require('../stores/SectionStore');
var SectionActions = require('../actions/SectionActions');
var StructureActions = require('../actions/StructureActions');
var Hasher = require('../utils/Hasher');
var Txt = require('./modules/Text');
var SectionKeys = require('../utils/SectionKeys');

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

	handleToogleDisplaySequence: function(){
		this.setState({isDisplayOrder : !this.state.isDisplayOrder});
	},

	handleToogleDisplaySelection: function(){
		this.setState({isDisplaySelection : !this.state.isDisplaySelection});
	},

	handleChangeTitle: function(val) {
		SectionActions.changeTitle(val);
	},

	render:function() {
		var isDisplayOrder = { display: this.state.isDisplayOrder ? 'block' : 'none' };
		var isDisplaySelection = { display: this.state.isDisplaySelection ? 'block' : 'none' };
		return (
			<div>
				<div className="input-group">
		            <span className="input-group-addon">Название раздела : *</span>
		            <Txt.TextView value={this.props.title} onBlur={this.handleChangeTitle} placeholder='Название раздела'/>
		        </div>
		        <div className="input-group all">
		            <span className="input-group-addon">Проходной балл : *</span>
		            <Txt.TextView value={this.props.passingScore} onBlur={this.handleChangeTitle} placeholder='Проходной балл'/>
		        </div>
		        <div className="input-group all">
		            <span className="input-group-addon">Длительность (минут) : *</span>
		            <Txt.TextView value={this.props.duration} onBlur={this.handleChangeTitle} placeholder='Длительность (минут)'/>
	        	</div>
	        	<div className="input-group all">
					<button className="btn btn-default dropdown-toggle" type="button" onClick={this.handleToogleDisplaySequence}>
						<span>{SectionKeys.order.values[this.props.order]}&nbsp;&nbsp;</span>
						<span className="caret"></span>
					</button>
					<ul className="dropdown-menu" style={isDisplayOrder}>
						{Object.keys(SectionKeys.order.keys).map(function(o, index){
							return <li key={index} onClick={this.handleSelectOrder}><span>{SectionKeys.order.values[o]}</span></li>
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
							return <li key={index} onClick={this.handleSelectSelection}><span>{SectionKeys.selection.values[s]}</span></li>
						}.bind(this))}
					</ul>
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
		Hasher.setHash('structure');
	},

	handleSaveSection: function(){
		StructureActions.saveSection(SectionStore.getSection());
		SectionStore.removeChangeListener(this._onChange);
		Hasher.setHash('structure');
	},

	render: function () {
		return (
			<div className="modal" style={{display: "block"}}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" onClick={this.handleClose}>&times;</button>
        					<h4 className="modal-title">Добавьте раздел</h4>
						</div>
						<div className="modal-body">
							<Fields {...this.state.section}/>
						</div>
						<div className="modal-footer">
					        <button type="button" className="btn btn-default" onClick={this.handleSaveSection}>Сохранить</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = SectionView;