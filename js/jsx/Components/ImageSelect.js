var React = require('React');
var QuestionActions = require('../../Controllers/startController/actions/QuestionActions');

var ImageSelect = React.createClass({displayName: "ImageSelect",

	handleSubmitFile: function(e) {
		console.log(e.target);
	},

	onLoadFrame: function(e){
		console.log(e.target);
	},
		
	handleChange:function(e) {
		e.target.parentNode.submit();
		//if (this.props.changeImg)
		//	this.props.changeImg({name: img.value});
		//React.findDOMNode(this.refs.form).submit();
	},

	handleRemove: function(e) {
		e.target.value = '';
		if (this.props.changeImg)
			this.props.changeImg(null);
	},

	render:function(){
		var imgName = this.props.img ? this.props.img.name : '';
		var isDisplayIcon = { display: (!this.props.img || this.props.img.name.trim() == "") ? "none" : "inline-block" }
		return (
			React.createElement("div", {className: "input-group"}, 
			   	React.createElement("div", {tabIndex: "-1", className: "form-control file-caption  kv-fileinput-caption"}, 
			   		React.createElement("span", {title: imgName, className: "file-caption-ellipsis"}, "…"), 
			   		React.createElement("div", {title: imgName, className: "file-caption-name", style: isDisplayIcon}, 
			   			React.createElement("span", {className: "glyphicon glyphicon-file kv-caption-icon"}, " ", imgName)
			   		)
				), 
			   	React.createElement("div", {className: "input-group-btn"}, 
			    	React.createElement("button", {type: "button", title: "Clear selected files", className: "btn btn-default fileinput-remove fileinput-remove-button", style: isDisplayIcon, onClick: this.handleRemove}, 
			    		React.createElement("i", {className: "glyphicon glyphicon-trash"})
			    	), 
			       	React.createElement("div", {style: {"overflow": "hidden"}, className: "btn btn-primary btn-file"}, 
			       		React.createElement("i", {className: "glyphicon glyphicon-picture"}), 
			       		React.createElement("span", null, "   … "), 

			       		React.createElement("form", {action: "/async-upload", method: "post", enctype: "multipart/form-data", target: "iframe-name", onSubmit: this.handleSubmitFile}, 
			       			React.createElement("input", {accept: "image/*", name: "file_name", className: "file", type: "file", onChange: this.handleChange, title: "Добавить изображение"})
						), 
						React.createElement("iframe", {name: "iframe-name", src: "#", style: {"display":"none"}, onLoad: this.onLoadFrame})
			       	)
			   	)
			)
		);	
	}
});

module.exports = ImageSelect;