var React = require('react');
var SectionStore = require('../stores/SectionStore');
var SectionActions = require('../actions/SectionActions');
var Hasher = require('../utils/Hasher');

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
		SectionStore.saveStructure(StructureStore.getStructure());
	},

	_onChange: function() {
		this.setState(getSectionState());
	},

	getInitialState: function () {
		return getSectionState();
	},

	handleSaveSection: function(){
		if (this.props.sectionUuid){
			//QuestionActions.saveSection(QuestionStore.getQuestion(), this.props.sectionUuid);
			Hasher.setHash('structure');
		}
	},

	render: function () {
		return (
			<div className="modal" style={{display: "block"}}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
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