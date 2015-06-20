var React = require('react');
var QuestionActions = require('../Controllers/startController/actions/QuestionActions');

var SelectImage = React.createClass({displayName: "SelectImage",
		
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
			React.createElement("form", {ecntype: "multipart/form-data", method: "POST", onSubmit: this.handleSubmit, ref: "form"}, 
				React.createElement("input", {type: "file", className: "file", onChange: this.handleChange})
			)
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

var ChoiceAnswer = React.createClass({displayName: "ChoiceAnswer",

	mixins:[Answer],

	render:function() {
		return(
			React.createElement("div", {className: "menu-float all"}, 
				React.createElement("label", null, 
					React.createElement("span", null, this.props.number, " "), 
					React.createElement("input", {type: "checkbox", checked: this.props.selected})
				), 
				React.createElement("div", null, 
					React.createElement("button", {type: "button", className: "btn btn-default btn-xs", onClick: this.shiftUp}, 
					  React.createElement("span", {className: "glyphicon glyphicon-arrow-up"})
					), 
					React.createElement("button", {type: "button", className: "btn btn-default btn-xs", onClick: this.shiftDown}, 
					  React.createElement("span", {className: "glyphicon glyphicon-arrow-down"})
					), 
					React.createElement("button", {type: "button", className: "btn btn-default btn-xs", onClick: this.remove}, 
					  React.createElement("span", {className: "glyphicon glyphicon-remove"})
					)
				), 
				React.createElement("div", null, 
					React.createElement("textarea", {className: "form-control", rows: "1", value: this.props.text, onChange: this.changeText}), 
					React.createElement("input", {type: "text", value: this.props.weight, onChange: this.changeWeight}), 
					React.createElement(SelectImage, null)
				)
			)
		);
	}
});

var OrderAnswer = React.createClass({displayName: "OrderAnswer",

	mixins:[Answer],

	render:function() {
		return(
			React.createElement("div", {className: "menu-float all"}, 
				React.createElement("label", null, 
					React.createElement("span", null, this.props.number, " "), 
					React.createElement("input", {type: "checkbox", checked: this.props.selected})
				), 
				React.createElement("div", null, 
					React.createElement("button", {type: "button", className: "btn btn-default btn-xs", onClick: this.shiftUp}, 
					  React.createElement("span", {className: "glyphicon glyphicon-arrow-up"})
					), 
					React.createElement("button", {type: "button", className: "btn btn-default btn-xs", onClick: this.shiftDown}, 
					  React.createElement("span", {className: "glyphicon glyphicon-arrow-down"})
					), 
					React.createElement("button", {type: "button", className: "btn btn-default btn-xs", onClick: this.remove}, 
					  React.createElement("span", {className: "glyphicon glyphicon-remove"})
					)
				), 
				React.createElement("div", null, 
					React.createElement("textarea", {className: "form-control", rows: "1", value: this.props.text}), 
					React.createElement("input", {type: "text", value: this.props.weight}), 
					React.createElement(SelectImage, null)
				)
			)
		);
	}
});

var MatchItemAnswer = React.createClass({displayName: "MatchItemAnswer",

	mixins:[Answer],

	render:function() {
		return(
			React.createElement("div", {className: "menu-float all"}, 
				React.createElement("div", null, 
					React.createElement("button", {type: "button", className: "btn btn-default btn-xs", onClick: this.shiftUp}, 
					  React.createElement("span", {className: "glyphicon glyphicon-arrow-up"})
					), 
					React.createElement("button", {type: "button", className: "btn btn-default btn-xs", onClick: this.shiftDown}, 
					  React.createElement("span", {className: "glyphicon glyphicon-arrow-down"})
					), 
					React.createElement("button", {type: "button", className: "btn btn-default btn-xs", onClick: this.remove}, 
					  React.createElement("span", {className: "glyphicon glyphicon-remove"})
					)
				), 
				React.createElement("textarea", {className: "form-control", rows: "1", value: this.props.text}), 
				React.createElement("input", {type: "text", value: this.props.weight}), 
				React.createElement(SelectImage, null), 
				React.createElement("label", null, 
					React.createElement("span", null, "Строк"), 
					React.createElement("input", {type: "text", value: this.props.rowsCount})
				), 
				React.createElement("label", null, 
					React.createElement("span", null, "Стобцов"), 
					React.createElement("input", {type: "text", value: this.props.colsCount})
				), 
				React.createElement("div", {className: "a-conditions"}

				)
			)
		);
	}
});

module.exports = {
	ChoiceAnswer: ChoiceAnswer,
	OrderAnswer: OrderAnswer,
	MatchItemAnswer: MatchItemAnswer
}