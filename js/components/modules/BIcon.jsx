var React = require('react');

var BIconView = React.createClass({

	render: function() {
		
		return (
			<div className="bicon-box">
				<span className={this.props.bclass}></span>
			</div>
		);
	}
});


module.exports = BIconView;