var React = require('react');
var extend = require('extend');

var TextBase = {

	componentWillMount: function() {
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
			this.refs.inpt.focus();
		}
	},

	handleDetranslate: function(e){
		this.refs.lbl.classList.remove('input-box__label_translate');
		this.refs.lbl.classList.add('input-box__label_detranslate');
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

var TextAreaView = React.createClass(extend(true, {}, TextBase, {

	handleChange: function(e){
		TextBase.handleChange.call(this, e);
		setTimeout(function(){
			this.setState({height: this.refs.hiddenBlock.offsetHeight});
		}.bind(this), 0)
	},

	handleAddtranslate: function(e){
		if (!e.target.classList.contains('textarea-box__label_translate')){
			e.target.classList.add('textarea-box__label_translate');
			this.refs.inpt.focus();
		}
	},

	handleDetranslate: function(e){
		this.refs.lbl.classList.remove('textarea-box__label_translate');
		this.refs.lbl.classList.add('textarea-box__label_detranslate');
	},

	componentDidMount: function(){
		this.setState({height: this.refs.hiddenBlock.offsetHeight});
	},

	getInitialState: function(){
		var baseObject = TextBase.getInitialState.call(this);
		baseObject.height = 0;
		return baseObject;
	},

	render: function() {
		var isNotEmptyClass = this.state.value === '' ? '' : 'textarea-box__input_not-empty';
		var isValidClass = !this.props.isValid(this.state.value) ? this.validClass : '';
		var textAreaStyle = { height: this.state.height + 'px' };
		return (
			<div className="textarea-box" tabIndex={1} onBlur={this.handleDetranslate}>
				<textarea style={textAreaStyle} className={"textarea-box__input " + isNotEmptyClass + " " + isValidClass} rows={this.props.rows || 1} value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} onBlur={this.handleBlur}></textarea>
                <label ref="lbl" onClick={this.handleAddtranslate} className="textarea-box__label">{this.props.placeholder}</label>
				<div ref="hiddenBlock" className="textarea-box__hidden-block">{this.state.value}</div>
			</div>
			
		);
	}
}));

module.exports = {
	TextView: TextView,
	TextAreaView: TextAreaView
}