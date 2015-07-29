var React = require('react');
var Config = require('../../config');

var ImageSelect = React.createClass({displayName: "ImageSelect",

	getInitialState: function() {
		return {
			uploading: false
		}
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({uploading: false});
		if (nextProps.img && nextProps.img.error)
			React.findDOMNode(this.refs.inputImage).value = '';
	},

	handleChange: function(e) {
		this.setState({uploading: true});
		if (this.props.uploadImage)
			this.props.uploadImage(e.target);
	},

	handleRemove: function(e) {
		if (this.props.removeImage){
			React.findDOMNode(this.refs.inputImage).value = '';
			this.props.removeImage(this.props.img);
		}
	},

	render: function(){
		var isDisplayUploading = { display: this.state.uploading ? "inline-block" : "none"}
		var error = this.props.img ? this.props.img.error : null;
		var isDisplayError = { display : error ? "inline-block" : "none" }
		var imgName = this.props.img ? this.props.img.name : null;
		var isDisplayIcon = { display: imgName ? "inline-block" : "none" }
		return (
			React.createElement("div", {className: "input-group"}, 
			   	React.createElement("div", {className: "form-control file-caption kv-fileinput-caption"}, 
			   		React.createElement("span", {title: imgName, className: "file-caption-ellipsis"}, "…"), 
			   		React.createElement("div", {title: imgName, className: "file-caption-name", style: isDisplayIcon}, 
			   			React.createElement("span", {className: "glyphicon glyphicon-file kv-caption-icon"}, " ", imgName)
			   		), 
			   		React.createElement("div", {title: error, className: "file-caption-name error-glyphicon", style: isDisplayError}, 
			   			React.createElement("span", {className: "glyphicon glyphicon-exclamation-sign kv-caption-icon"}, 
			   				React.createElement("span", {className: "error-block"}, " ", error)
			   			)
			   		), 
			   		React.createElement("div", {className: "file-caption-name", style: isDisplayUploading}, 
			   			React.createElement("img", {className: "loading-icon", src: Config.icons.loading})
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
			       			React.createElement("input", {ref: "inputImage", accept: "image/*", name: "files", className: "file", type: "file", onChange: this.handleChange, title: "Добавить изображение"})
						)
			       	)
			   	)
			)
		);	
	}
});

module.exports = ImageSelect;