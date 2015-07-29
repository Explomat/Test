var React = require('react');

var TextBase = {

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
}

var TextView = React.createClass({

	mixins: [TextBase],
	
	render:function() {
		return (
			<input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur} placeholder={this.props.placeholder}/>
		);
	}
});

var TextAreaView = React.createClass({

	mixins: [TextBase],

	render:function() {
		return (
			<textarea className="form-control" rows={this.props.rows || 2} value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur} placeholder={this.props.placeholder}></textarea>
		);
	}
});

module.exports = {
	TextView: TextView,
	TextAreaView: TextAreaView
}