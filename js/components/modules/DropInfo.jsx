var React = require('react');

var DropInfoHeader = React.createClass({
	render: function() {
		return (
			<div className="dropinfo__content-header">
				{this.props.children}
			</div>
		);
	}
});

var DropInfoBody = React.createClass({
	render: function() {
		return (
			<div className="dropinfo__content-body">
				{this.props.children}
			</div>
		);
	}
});

var DropInfoFooter = React.createClass({
	render: function() {
		return (
			<div className="dropinfo__content-footer">
				{this.props.children}
			</div>
		);
	}
});

var DropInfo = React.createClass({

	propTypes: {
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]),
		show: React.PropTypes.bool,
		descriptionMarkup: React.PropTypes.node,
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]),
		classNameBlock: React.PropTypes.string,
		additionalHeight: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
	},

	getDefaultProps: function(){
		return {
			additionalHeight: 20
		}
	},

	getInitialState: function() {
		return {
			show: this.props.show || false,
			height: 0
		}
	},

	handleToogelDisplay: function() {
		var height = !this.state.show ? this.refs.dropinfoContent.offsetHeight + this.props.additionalHeight : 0;
		this.setState({
			show: !this.state.show,
			height: height
		});
	},

	render: function() {
		var displayContentClassName = this.state.show ? "dropinfo__content-box_show" : "dropinfo__content-box_hide";
		var displayBlockClassName = !this.state.show ? "dropinfo__block_show": "dropinfo__block_hide";
		var glyphiconClass = this.state.show ? "glyphicon-menu-up" : "glyphicon-menu-down";
		var classNameBlock = this.props.classNameBlock ? this.props.classNameBlock : '';
		return (
			<div className="dropinfo">
				<div onClick={this.handleToogelDisplay} className={"dropinfo__block clearfix " + displayBlockClassName + " " + classNameBlock}>
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

module.exports = {
	DropInfo: DropInfo,
	DropInfoHeader: DropInfoHeader,
	DropInfoBody: DropInfoBody,
	DropInfoFooter: DropInfoFooter
}