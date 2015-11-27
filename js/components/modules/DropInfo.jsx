var React = require('react');

var DropInfoHeader = React.createClass({
	render: function() {
		return (
			<div className="dropinfo__header">
				{this.props.children}
			</div>
		);
	}
});

var DropInfoBody = React.createClass({
	render: function() {
		return (
			<div className="dropinfo__body">
				{this.props.children}
			</div>
		);
	}
});

var DropInfoFooter = React.createClass({
	render: function() {
		return (
			<div className="dropinfo__footer">
				{this.props.children}
			</div>
		);
	}
});

var DropInfo = React.createClass({

	propTypes: {
		show: React.PropTypes.bool,
		descriptionMarkup: React.PropTypes.node,
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]),
		classNameBlock: React.PropTypes.string
	},

	getInitialState: function() {
		return {
			show: this.props.show || false,
			height: 0
		}
	},

	handleToogelDisplay: function() {
		var height = !this.state.show ? this.refs.dropinfoContent.offsetHeight : 0;
		this.setState({
			show: !this.state.show,
			height: height
		});
	},

	render: function() {
		var displayContentClassName = this.state.show ? "dropinfo__content-box_show" : "dropinfo__content-box_hide";
		var displayBlock = { display : !this.state.show ? "block": "none" };
		var glyphiconClass = this.state.show ? "glyphicon-menu-up" : "glyphicon-menu-down";
		var classNameBlock = this.props.classNameBlock ? this.props.classNameBlock : '';
		return (
			<div className="dropinfo">
				<div onClick={this.handleToogelDisplay} style={displayBlock} className={"dropinfo__block clearfix " + classNameBlock}>
					{this.props.descriptionMarkup}
					<span className={"dropinfo__glyphicon-block glyphicon " + glyphiconClass}></span>
				</div>
				<div style={{height: this.state.height}} className={"dropinfo__content-box " + displayContentClassName}>
					<div ref="dropinfoContent" className="dropinfo__content">
						{this.props.children}
						<span onClick={this.handleToogelDisplay} className={"dropinfo__glyphicon-content glyphicon " + glyphiconClass}></span>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = DropInfo;