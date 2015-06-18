var React = require('react');

var SelectImage = React.createClass({
		
	handleChange:function(e) {
		//React.findDOMNode(this.refs.form).submit();
	},

	handleSubmit:function(e) {
		e.preventDefault();
		alert("submit");
		return;
	},

	render:function(){
		return (
			<form ecntype="multipart/form-data" method="POST" onSubmit={this.handleSubmit} ref="form">
				<input type="file" className="file" onChange={this.handleChange}/>
			</form>
		);	
	}
});

var ChoiceAnswer = React.createClass({
	render:function() {
		return(
			<div className="menu-float all">
				<label>
					<span>{this.props.number}&nbsp;</span>
					<input type="checkbox" checked={this.props.selected}/>
				</label>
				<div>
					<textarea className="form-control" rows="1" value={this.props.text}></textarea>
					<input type="text" value={this.props.weight}/>
					<SelectImage />
				</div>
			</div>
		);
	}
});

var OrderAnswer = React.createClass({
	render:function() {
		return(
			<div className="menu-float all">
				<label>
					<span>{this.props.number}&nbsp;</span>
					<input type="checkbox" checked={this.props.selected}/>
				</label>
				<div>
					<textarea className="form-control" rows="1" value={this.props.text}></textarea>
					<input type="text" value={this.props.weight}/>
					<SelectImage />
				</div>
			</div>
		);
	}
});

var MatchItemAnswer = React.createClass({
	render:function() {
		return(
			<div className="menu-float all">
				<textarea className="form-control" rows="1" value={this.props.text}></textarea>
				<input type="text" value={this.props.weight}/>
				<SelectImage />
				<label>
					<span>Строк</span>
					<input type="text" value={this.props.rowsCount} />
				</label>
				<label>
					<span>Стобцов</span>
					<input type="text" value={this.props.colsCount} />
				</label>
				<div className="a-conditions">
					
				</div>
			</div>
		);
	}
});

module.exports = {
	ChoiceAnswer: ChoiceAnswer,
	OrderAnswer: OrderAnswer,
	MatchItemAnswer: MatchItemAnswer
}