var React = require('react');
var Config = require('../../config');

var ImageSelect = React.createClass({

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
			<div className="input-group">
			   	<div className="form-control file-caption kv-fileinput-caption">
			   		<span title={imgName} className="file-caption-ellipsis">…</span>
			   		<div title={imgName} className="file-caption-name" style={isDisplayIcon}>
			   			<span className="glyphicon glyphicon-file kv-caption-icon"> {imgName}</span>
			   		</div>
			   		<div title={error} className="file-caption-name error-glyphicon" style={isDisplayError}>
			   			<span className="glyphicon glyphicon-exclamation-sign kv-caption-icon">
			   				<span className="error-block">&nbsp;{error}</span>
			   			</span>
			   		</div>
			   		<div className="file-caption-name" style={isDisplayUploading}>
			   			<img className="loading-icon" src={Config.icons.loading} />
			   		</div>
				</div>
			   	<div className="input-group-btn">
			    	<button type="button" title="Clear selected files" className="btn btn-default fileinput-remove fileinput-remove-button" style={isDisplayIcon} onClick={this.handleRemove}>
			    		<i className="glyphicon glyphicon-trash"></i> 
			    	</button>
			       	<div style={{"overflow": "hidden"}} className="btn btn-primary btn-file">
			       		<i className="glyphicon glyphicon-picture"></i>
			       		<span> &nbsp; … </span>

			       		<div className="js-fileapi-wrapper upload-btn">
			       			<input ref="inputImage" accept="image/*" name="files" className="file" type="file" onChange={this.handleChange} title="Добавить изображение"/>
						</div>
			       	</div>
			   	</div>
			</div>
		);	
	}
});

module.exports = ImageSelect;