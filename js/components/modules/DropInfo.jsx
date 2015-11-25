var React = require('react');

var Item = React.createClass({

	render: function() {
		return (
			<div>
			</div>
		);
	}
});

var DropDown = React.createClass({

	propTypes: {
		descriptionMarkup: React.PropTypes.node,
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array])
	},

	getInitialState: function() {
		return {
			display: false
		}
	},

	handleToogelDisplay: function() {
		this.setState({display: !this.state.display});
	},

	render: function() {
		var display = { display: this.state.display ? "block" : "none" };
		var glyphiconClass = this.state.display ? "glyphicon-menu-up" : "glyphicon-menu-down";
		return (
			<div className="dropinfo">
				<div onClick={this.handleToogelDisplay} className="dropinfo__block">
					{this.props.descriptionMarkup}
					<span className={"dropinfo__glyphicon glyphicon " + glyphiconClass}></span>
				</div>
				<div style={display} className="dropinfo__hideblock">
					{this.props.children}
				</div>
			</div>
		);
	}
});

module.exports = DropDown;