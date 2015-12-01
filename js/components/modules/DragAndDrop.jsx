var React = require('react');

var DragAndDrop = React.createClass({

	componentDidMount: function(){
		this.setState({height: this.refs.hiddenBlock.offsetHeight});
	},

	getInitialState: function(){
		var baseObject = TextBase.getInitialState.call(this);
		baseObject.height = 0;
		return baseObject;
	},

	render: function() {

		return (
			<div className={"textarea-box " + className} tabIndex={1} onBlur={this.handleDetranslate}>
				
			</div>
			
		);
	}
});

module.exports = {
	TextView: TextView,
	TextAreaView: TextAreaView
}