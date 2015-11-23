var React = require('react');
var extend = require('extend');

var Item = React.createClass({

	handleChange: function(e) {
		if (this.props.onChange)
			this.props.onChange(e, this.props.payload, this.props.text);
	},

	render: function() {
		return (
			<li className="dropdown-list__item" onClick={this.handleChange}>
				<span>{this.props.text}</span>
			</li>
		);
	}
});

var DropDown = React.createClass({

	propTypes: {
		items: React.PropTypes.array.isRequired, //[{ payload: 1, text: 'Test' },{...}]
		deviders: React.PropTypes.array //указать индексы элементов после которых вставлять разделители
		selected: React.PropTypes.number
	},

	getDefaultProps: function(){
		return {
			selected: 0
		}
	},

	getInitialState: function() {
		return {
			display: false,
			selected: this.props.selected
		}
	},


	_stopPropagation: function(e){
		if (!e || (!e.stopPropagation && !e.nativeEvent)) return;
		e.stopPropagation();
    	e.nativeEvent.stopImmediatePropagation();
	},

	_unmountComponent: function(){
		document.removeEventListener('click', this.handleBlurTypes);
	},	

	componentWillUnmount: function() {
		this._unmountComponent();
	},

	componentDidMount: function() {
		document.addEventListener('click', this.handleBlurTypes);
	},

	handleChange: function(e, payload, text) {
		if (this.props.onChange) {
			this.props.onChange(e, payload, text);
		}
	},

	handleBlurTypes: function() {
		if (this.state.display)
			this.setState({display: false});
		this._unmountComponent();
	},

	handleToogelDisplay: function(e) {
		this._stopPropagation(e);
		this.setState({display: !this.state.display});
	},

	render: function() {
		var isTypeDisplayStyle = { display: this.state.display ? "block" : "none" };
		return (
			<div className="dropdown-box">
				<button className="dropdown-box__default-item" type="button" onClick={this.handleToogelDisplay}>
					<span>{QuestionTypes.values[this.props.type]}&nbsp;&nbsp;</span>
					<span className="caret"></span>
				</button>
				<ul className="dropdown-list" style={isTypeDisplayStyle}>
					{this.props.items.forEach(function(item, index){
						if (index % 2 == 0 && index !== 0)
							return <li key={"divider"+ index} className="dropdown-list__devider"></li>;
						return <Item key={index} {...item} onChange={this.handleChange}/>
					})}
				</ul>
			</div>
		);
	}
});

module.exports = DropDown;