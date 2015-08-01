var React = require('react');
var StructureStore = require('../stores/StructureStore');

function getStructureState() {
	return {
		sections: StructureStore.getSections()
	};
}

var QuestionShortView = React.createClass({
	render: function(){
		return(
			<div>
				{this.props.name}
			</div>
		);
	}
});

var SectionView = React.createClass({

	render: function() {
		var list = [];
		var childs = this.props.questions || [];
		childs.forEach(function(child){
			list.push(<QuestionShortView key={child.uuid} name={child.name} />)
		});
		return (
			<div>
				{this.props.name}
				<div>
					{list}
				</div>
			</div>
		);
	}
});

var StructureView = React.createClass({

	componentDidMount:function() {
		StructureStore.addChangeListener(this._onChange);
	},

	componentWillUnmount:function() {
		StructureStore.removeChangeListener(this._onChange);
	},

	_onChange:function() {
		this.setState(getStructureState());
	},

	getInitialState: function () {
		return getStructureState();
	},

	render:function () {
		var list = [];
		var sections = this.state.sections;
		sections.forEach(function(sec){
			list.push(<SectionView key={sec.uuid} name={sec.name} childs={sec.questions} />)
		})
		return (
			<div className="panel panel-default">
				{list}
			</div>
		);
	}
});

module.exports = StructureView;