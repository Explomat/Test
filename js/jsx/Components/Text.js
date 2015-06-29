var React = require('react');

var TextView = React.createClass({displayName: "TextView",

	componentDidMount: function() {
		this.validClass = 'not-valid';
	},

	handleChange: function(e) {
		if (!this.props.isValid(e.target.value))
			e.target.classList.add(this.validClass);
		else
			e.target.classList.remove(this.validClass);
		this.setState({value: e.target.value});
	},

	handleBlur: function(e){
		var val = e.target.value;
		if (!this.props.isValid(e.target.value)) {
			this.setState({value: this.props.value});
			e.target.classList.remove(this.validClass);
			val = this.props.value;
		}

		if (this.props.onBlur)
			this.props.onBlur(val);
	},

	getDefaultProps: function() {
		return {
			value: '',
			placeholder: '',
			isValid: function() {
				return true;
			}
		}
	},

	getInitialState: function() {
		return {
			value: this.props.value
		}
	},
	
	render:function() {
		return (
			React.createElement("input", {ref: "txt", className: "form-control", type: "text", value: this.state.value, onChange: this.handleChange, onBlur: this.handleBlur, placeholder: this.props.placeholder})
		);
	}
});

module.exports = TextView;