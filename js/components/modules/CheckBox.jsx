var React = require('react');

var CheckBoxView = React.createClass({

	propsTypes: {
		checked: React.PropTypes.bool,
		label: React.PropTypes.string,
		onChangeChecked: React.PropTypes.func,
		className: React.PropTypes.string,
		style: React.PropTypes.object
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({checked: nextProps.checked});
	},

	getInitialState: function(){
		return {
			checked: this.props.checked || false
		}
	},

	handleToggleChecked: function(e){
		e.stopPropagation();
    	e.nativeEvent.stopImmediatePropagation();

		this.setState({checked: !this.state.checked});
		if (this.props.onChangeChecked){
			this.props.onChangeChecked(!this.state.checked);
		}
	},

	render: function() {
		var className = this.props.className ? this.props.className : '';
		return (
			<div style={this.props.style} className={"checkbox-box " + className} onClick={this.handleToggleChecked}>
				<input className="checkbox-box__input" type="checkbox" checked={this.state.checked} onChange={function(){}}/>
    			<label className="checkbox-box__label">{this.props.label}</label>
			</div>
		);
	}
});

module.exports = CheckBoxView;