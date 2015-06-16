var React = require('react');

var MultipleChoiceAnswer = React.createClass({
	render:function() {
		return(
			<div>
				<label>{this.props.number}</label>
				<input type="checkbox"/>
				<div>
					<label>{this.props.description}<label>
					<textarea className="form-control" rows="2" value={this.props.text} onChange={this.handleChange}></textarea>
				</div>
			</div>
		);
	}
});

var OrderAnswer = React.createClass({
	render:function() {
		return(
		);
	}
});

module.exports = AnswersView;