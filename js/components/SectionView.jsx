var React = require('react');
var SectionStore = require('../stores/SectionStore');
var SectionActions = require('../actions/SectionActions');
var StructureActions = require('../actions/StructureActions');
var Hasher = require('../utils/Hasher');
var Txt = require('./modules/Text');

function getSectionState() {
	return {
		section: SectionStore.getSection()
	};
}

var Title = React.createClass({

	handleChangeTitle: function(val) {
		SectionActions.changeTitle(val);
	},

	render:function() {
		return (
			<div className="input-group all">
	            <span className="input-group-addon">Название раздела : *</span>
	            <Txt.TextView value={this.props.title} onBlur={this.handleChangeTitle} placeholder='Название раздела'/>
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
		Hasher.setHash('structure');
	},

	handleSaveSection: function(){
		StructureActions.saveSection(SectionStore.getSection());
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
							<Title title={this.state.section.name}/>
						</div>
						<div className="modal-footer">
					        <button type="button" className="btn btn-default" onClick={this.handleSaveSection}>Добавить</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = SectionView;