var React = require('React');
var QuestionActions = require('../../Controllers/startController/actions/QuestionActions');

var ImageSelect = React.createClass({displayName: "ImageSelect",

	changeImg: function(img) {
		if (this.props.changeImg)
			this.props.changeImg(img);
	},
		
	handleChange: function(e) {
		//e.target.parentNode.submit();
		//React.findDOMNode(this.refs.form).submit();

		var files = FileAPI.getFiles(e);
		var ctx = this;
		FileAPI.upload({
			url: 'http://study.merlion.ru/custom_web_template.html?object_id=6135330846971222087&server_id=6166852566696923932&action_name=saveFile',
			files: { file_upload: files },
			complete: function (err, xhr){
				var img = JSON.parse(xhr.responseText);
				ctx.changeImg(img);
			}
		});
	},

	handleRemove: function(e) {
		e.target.value = '';
		this.changeImg(null);
	},

	render: function(){
		var imgName = this.props.img ? this.props.img.name : '';
		var isDisplayIcon = { display: (!this.props.img || this.props.img.name.trim() == "") ? "none" : "inline-block" }
		console.log(imgName);
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

			       		React.createElement("div", {className: "js-fileapi-wrapper upload-btn"}, 
			       			React.createElement("input", {accept: "image/*", name: "files", className: "file", type: "file", onChange: this.handleChange, title: "Добавить изображение"})
						)
			       	)
			   	)
			)
		);	
	}
});

module.exports = ImageSelect;