var React = require('react');

var TextBase = {

	componentDidMount: function() {
		this.validClass = 'not-valid';
	},

	handleChange: function(e) {
		/*if (!this.props.isValid(e.target.value))
			e.target.classList.add(this.validClass);
		else
			e.target.classList.remove(this.validClass);*/
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

	handleAddtranslate: function(e){
		if (!e.target.classList.contains('input-box__label_translate')){
			e.target.classList.add('input-box__label_translate');
			this.refs.inpt.getDOMNode().focus();
		}
	},

	handleDetranslate: function(e){
		this.refs.lbl.getDOMNode().classList.remove('input-box__label_translate');
		this.refs.lbl.getDOMNode().classList.add('input-box__label_detranslate');
	},

	render:function() {
		var isNotEmptyClass = this.state.value === '' ? '' : 'input-box__input_not-empty';
		var isValidClass = !this.props.isValid(this.state.value) ? this.validClass : '';
		
		return (
			<div className="input-box" tabIndex={1} onBlur={this.handleDetranslate}>
				<input ref="inpt" className={"input-box__input " + isNotEmptyClass + " " + isValidClass} type="text" value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur}/>
                <label ref="lbl" onClick={this.handleAddtranslate} className="input-box__label">{this.props.placeholder}</label>
			</div>
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