var React = require('react');

var DropInfoHeader = React.createClass({

	contextTypes: {
        parent: React.PropTypes.any
    },

    handleClick: function(){
    	this.context.parent.handleToogleExpand();
    },

	render: function() {
		var className = this.props.className ? this.props.className : '';
		return (
			<div onClick={this.handleClick} className={"dropinfo__content-header " + className}>
				{this.props.children}
			</div>
		);
	}
});

var DropInfoBody = React.createClass({

	render: function() {
		var className = this.props.className ? this.props.className : '';
		return (
			<div className={"dropinfo__content-body " + className}>
				{this.props.children}
			</div>
		);
	}
});

var DropInfoFooter = React.createClass({

	render: function() {
		var className = this.props.className ? this.props.className : '';
		return (
			<div className={"dropinfo__content-footer " + className}>
				{this.props.children}
			</div>
		);
	}
});

var DropInfo = React.createClass({

	propTypes: {
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]),
		expanded: React.PropTypes.bool,
		onExpand: React.PropTypes.func,
		descriptionMarkup: React.PropTypes.node,
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]),
		classNameBlock: React.PropTypes.string,
		additionalHeight: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
	},

	childContextTypes: {
		parent: React.PropTypes.any
	},

	getChildContext: function() {
        return { 
        	parent: this
        };
    },

	getDefaultProps: function(){
		return {
			additionalHeight: 20,
			expanded: false
		}
	},

	getInitialState: function() {
		return {
			expanded: this.props.expanded,
			height: 0
		}
	},

	componentDidMount: function(){
		this.expand(this.props.expanded);
	},

	componentWillReceiveProps: function(nextProps){
		if (nextProps.expanded !== undefined && nextProps.expanded !== null){
			this.expand(nextProps.expanded);
		}
	},

	expand: function(_expanded){
		var height = _expanded ? this.refs.dropinfoContent.offsetHeight + this.props.additionalHeight : 0;
		this.setState({
			expanded: _expanded,
			height: height
		});
	},

	handleToogleExpand: function() {
		var height = !this.state.expanded ? this.refs.dropinfoContent.offsetHeight + this.props.additionalHeight : 0;
		this.setState({
			expanded: !this.state.expanded,
			height: height
		});
		if (this.props.onExpand) {
			this.props.onExpand(!this.state.expanded);
		}
	},

	render: function() {
		var displayContentClassName = this.state.expanded ? "dropinfo__content-box_show" : "dropinfo__content-box_hide";
		var displayBlockClassName = !this.state.expanded ? "dropinfo__block_show": "dropinfo__block_hide";
		var glyphiconClass = this.state.expanded ? "glyphicon-menu-up" : "glyphicon-menu-down";
		var classNameBlock = this.props.classNameBlock ? this.props.classNameBlock : '';
		return (
			<div className="dropinfo">
				<div onClick={this.handleToogleExpand} className={"dropinfo__block clearfix " + displayBlockClassName + " " + classNameBlock}>
					{this.props.descriptionMarkup}
					<span className={"dropinfo__glyphicon-block glyphicon " + glyphiconClass}></span>
				</div>
				<div style={{height: this.state.height}} className={"dropinfo__content-box " + displayContentClassName}>
					<div ref="dropinfoContent" className="dropinfo__content">
						{this.props.children}
						<span onClick={this.handleToogleExpand} className={"dropinfo__glyphicon-content glyphicon " + glyphiconClass}></span>
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