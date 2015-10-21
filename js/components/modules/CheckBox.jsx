var React = require('react');

var CheckBoxView = React.createClass({

	propsTypes: {
		checked: React.PropTypes.bool,
		label: React.PropTypes.string,
		onChangeChecked: React.PropTypes.func
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({checked: nextProps.checked});
	},

	getInitialState: function(){
		return {
			checked: this.props.checked || false
		}
	},

	handleToggleChecked: function(){
		this.setState({checked: !this.state.checked});
		if (this.props.onChangeChecked){
			this.props.onChangeChecked(!this.state.checked);
		}
	},

	render: function() {
		return (
			<div className="checkbox-box" onClick={this.handleToggleChecked}>
				<input className="checkbox-box__input" type="checkbox" checked={this.state.checked} onChange={function(){}}/>
    			<label className="checkbox-box__label">{this.props.label}</label>
			</div>
		);
	}
});

module.exports = CheckBoxView;