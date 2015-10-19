var React = require('react');

var CheckBoxView = React.createClass({

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
			this.props.onChangeChecked(this.state.checked);
		}
	},

	render: function() {
		return (
			<div className="checkbox-box" onClick={this.handleToggleChecked}>
				<input className="checkbox-box__input" type="checkbox" checked={this.state.checked}/>
    			<label className="checkbox-box__label">{this.props.label}</label>
			</div>
		);
	}
});

module.exports = CheckBoxView;