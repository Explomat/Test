var React = require('React');
var QuestionActions = require('../../Controllers/startController/actions/QuestionActions');

var ImageSelect = React.createClass({

	changeImg: function(img) {
		if (this.props.changeImg)
			this.props.changeImg(img);
	},
		
	handleChange: function(e) {
		/*var files = FileAPI.getFiles(e);
		var ctx = this;
		FileAPI.upload({
			url: 'http://study.merlion.ru/custom_web_template.html?object_id=6135330846971222087&server_id=6166852566696923932&action_name=saveFile',
			files: { file_upload: files },
			complete: function (err, xhr){
				var img = JSON.parse(xhr.responseText);
				ctx.changeImg(img);
			}
		});*/
	},

	handleRemove: function(e) {
		e.target.value = '';
		this.changeImg(null);
	},

	render: function(){
		var imgName = this.props.img ? this.props.img.name : '';
		var isDisplayIcon = { display: (!this.props.img || this.props.img.name.trim() == "") ? "none" : "inline-block" }
		return (
			<div className="input-group">
			   	<div tabIndex="-1" className="form-control file-caption  kv-fileinput-caption">
			   		<span title={imgName} className="file-caption-ellipsis">…</span>
			   		<div title={imgName} className="file-caption-name" style={isDisplayIcon}>
			   			<span className="glyphicon glyphicon-file kv-caption-icon"> {imgName}</span>
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
			       			<input accept="image/*" name="files" className="file" type="file" onChange={this.handleChange} title="Добавить изображение"/>
						</div>
			       	</div>
			   	</div>
			</div>
		);	
	}
});

module.exports = ImageSelect;