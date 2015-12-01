var React = require('react');

var curDragElement = null, DRAG_EFFECT = 'move';

var DragAndDrop = React.createClass({

	propTypes: {
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]),
		className: React.PropTypes.string
	},

	componentDidMount: function(){
		
	},

	getInitialState: function(){
		
	},

	handleDragEnter: function(e){
		e.preventDefault();
		if (!curDragElement || curDragElement.node.id === this.props.uuid) return;
		if (curDragElement.sectionUuid === this.props.sectionUuid)
			StructureActions.replaceQuestionInSection(curDragElement.node.id, curDragElement.sectionUuid, this.props.uuid);
	},

	handleDragStart: function(e){
		e.dataTransfer.effectAllowed = DRAG_EFFECT;
		//this code is not needed, but FF not working without this
		e.dataTransfer.setData("text", "some text");
		//
		curDragElement = { node: e.target, sectionUuid: this.props.sectionUuid };
		curDragElement.node.classList.add('question__dnd-start');
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
		if (curDragElement && curDragElement.sectionUuid !== this.props.sectionUuid)
			StructureActions.replaceQuestionInNewSection(curDragElement.node.id, curDragElement.sectionUuid, this.props.sectionUuid);
		curDragElement = null;
	},

	render: function() {

		return (
			<div draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} onDrop={this.handleDrop} onDragOver={this.handleAllowDrop} onDragEnter={this.handleDragEnter}>
				
			</div>
			
		);
	}
});

module.exports = DragAndDrop;