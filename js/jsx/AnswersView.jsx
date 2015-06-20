var React = require('react');
var QuestionActions = require('../Controllers/startController/actions/QuestionActions');

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
				<input type="file" className="file" onChange={this.handleChange} />
			</form>
		);	
	}
});

var Answer = {

	shiftUp: function(){
		QuestionActions.shiftUpAnswer(this.props.uuid);
	},

	shiftDown: function(){
		QuestionActions.shiftDownAnswer(this.props.uuid);
	},

	changeText: function(e){
		QuestionActions.changeTextAnswer(this.props.uuid, e.target.value);
	},

	changeWeight: function(e){
		QuestionActions.changeWeightAnswer(this.props.uuid, e.target.value);
	},

	remove: function(){
		QuestionActions.removeAnswer(this.props.uuid);
	}
}

var ChoiceAnswer = React.createClass({

	mixins:[Answer],

	render:function() {
		return(
			<div className="menu-float all">
				<label>
					<span>{this.props.number}&nbsp;</span>
					<input type="checkbox" checked={this.props.selected}/>
				</label>
				<div>
					<button type="button" className="btn btn-default btn-xs" onClick={this.shiftUp}>
					  <span className="glyphicon glyphicon-arrow-up"></span>
					</button>
					<button type="button" className="btn btn-default btn-xs" onClick={this.shiftDown}>
					  <span className="glyphicon glyphicon-arrow-down"></span>
					</button>
					<button type="button" className="btn btn-default btn-xs" onClick={this.remove}>
					  <span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>
				<div>
					<textarea className="form-control" rows="1" value={this.props.text} onChange={this.changeText}></textarea>
					<input type="text" value={this.props.weight} onChange={this.changeWeight}/>
					<SelectImage />
				</div>
			</div>
		);
	}
});

var OrderAnswer = React.createClass({

	mixins:[Answer],

	render:function() {
		return(
			<div className="menu-float all">
				<label>
					<span>{this.props.number}&nbsp;</span>
					<input type="checkbox" checked={this.props.selected}/>
				</label>
				<div>
					<button type="button" className="btn btn-default btn-xs" onClick={this.shiftUp}>
					  <span className="glyphicon glyphicon-arrow-up"></span>
					</button>
					<button type="button" className="btn btn-default btn-xs" onClick={this.shiftDown}>
					  <span className="glyphicon glyphicon-arrow-down"></span>
					</button>
					<button type="button" className="btn btn-default btn-xs" onClick={this.remove}>
					  <span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>
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

	mixins:[Answer],

	render:function() {
		return(
			<div className="menu-float all">
				<div>
					<button type="button" className="btn btn-default btn-xs" onClick={this.shiftUp}>
					  <span className="glyphicon glyphicon-arrow-up"></span>
					</button>
					<button type="button" className="btn btn-default btn-xs" onClick={this.shiftDown}>
					  <span className="glyphicon glyphicon-arrow-down"></span>
					</button>
					<button type="button" className="btn btn-default btn-xs" onClick={this.remove}>
					  <span className="glyphicon glyphicon-remove"></span>
					</button>
				</div>
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